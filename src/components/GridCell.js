import React, { useState, useEffect } from 'react';
import { Icon, Button, Tag, Image, Box, Level } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import StoreProvider from '../store/StoreProvider';
import { updateCell } from '../store/StoreActions';
import SelectHybrid from './SelectHybrid';

export const GridCell = props => {
  const {
    cell,
    line,
    col,
    dispatchToStore,
    authenticated,
    userId,
    filter,
  } = props;
  const [showSelect, setShowSelect] = useState(false);
  const [index, setIndex] = useState(0);
  const [hybrids, setHybrids] = useState(props.hybrids);

  useEffect(() => {
    const newHybrids = props.hybrids.filter(
      h => !filter || !filter.user || h.user === filter.user
    );
    setHybrids(newHybrids);
    setIndex(Math.floor(Math.random() * newHybrids.length));
  }, [filter]);

  const unlinkHybrid = hybrid => () => {
    dispatchToStore(
      updateCell({
        id: cell.id,
        hybrids: cell.hybrids.filter(id => id !== hybrid.id),
      })
    );
  };

  return (
    <td>
      <Box className="is-paddingless">
        <SelectHybrid
          cell={cell}
          line={line}
          col={col}
          show={showSelect}
          setShow={setShowSelect}
        />
        {authenticated ? (
          <Level className="is-marginless">
            <Level.Side>
              <Button
                size="small"
                color="white"
                className="is-rounded"
                onClick={() => {
                  setShowSelect(true);
                }}
                data-tooltip="Ajouter une image"
              >
                <Icon className="fa fa-plus" alt="Ajouter une image" />
              </Button>
            </Level.Side>
            {hybrids[index] && userId == hybrids[index].user ? (
              <Level.Side>
                <Button
                  size="small"
                  color="white"
                  className="is-rounded"
                  onClick={unlinkHybrid(hybrids[index])}
                  data-tooltip="Enlever de la grille"
                >
                  <Icon
                    className="fa fa-times-circle"
                    alt="Enlever de la grille"
                  />
                </Button>
              </Level.Side>
            ) : (
              <></>
            )}
          </Level>
        ) : (
          <></>
        )}
        {hybrids[index] ? (
          <>
            <Link to={`/hybrid/${hybrids[index].id}`}>
              <Image src={hybrids[index].url} style={{ maxWidth: '300px' }} />
            </Link>
            <Level className="is-marginless">
              <Level.Side>
                <Button
                  color="white"
                  size="small"
                  className="is-rounded"
                  onClick={() =>
                    setIndex(index === 0 ? hybrids.length - 1 : index - 1)
                  }
                >
                  <Icon
                    className="fa fa-chevron-circle-left"
                    alt="image précedente"
                  />
                </Button>
              </Level.Side>
              <Level.Side>
                <Tag color="white">
                  {index + 1}/{hybrids.length}
                </Tag>
              </Level.Side>
              <Level.Side>
                <Button
                  className="is-rounded"
                  size="small"
                  color="white"
                  onClick={() =>
                    setIndex(index === hybrids.length - 1 ? 0 : index + 1)
                  }
                >
                  <Icon
                    className="fa fa-chevron-circle-right"
                    alt="image suivante"
                  />
                </Button>
              </Level.Side>
            </Level>
          </>
        ) : (
          <></>
        )}
      </Box>
    </td>
  );
};

function extraProps(store, props) {
  const cell = store.getGridCell({
    line: props.line.id,
    col: props.col.id,
    grid: props.grid,
  });
  const hybrids = cell.hybrids.map(id => store.hybrids[id]).reverse();
  return {
    cell,
    hybrids,
    authenticated: store.session.authenticated,
    userId: store.session.user ? store.session.user.id : undefined,
  };
}

export default StoreProvider(extraProps)(GridCell);
