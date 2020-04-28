import React, { useState, useEffect } from 'react';
import {
  Tile,
  Pagination,
  Form,
  Level,
  Icon,
  Button,
  Columns,
} from 'react-bulma-components';
import { useLocation, useHistory } from 'react-router-dom';

export const ElementsDisplay = ({
  ChildComponent,
  getChildProps,
  elements,
  byLine,
  hideControl,
}) => {
  getChildProps = getChildProps || (() => ({}));

  const sliderValues = [12, 6, 4, 3, 2, 1];

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const urlPage = JSON.parse(params.get('page'));
  const urlByLine = JSON.parse(params.get('byLine'));
  const urlByPage = JSON.parse(params.get('byPage'));

  const [nbByLine, setnbByLine] = useState(byLine || urlByLine || 4);
  const [page, setPage] = useState(urlPage || 1);
  const [nbByPage, setNbByPage] = useState(urlByPage || 50);

  const history = useHistory();
  useEffect(() => {
    params.set('page', JSON.stringify(page));
    params.set('byLine', JSON.stringify(nbByLine));
    params.set('byPage', JSON.stringify(nbByPage));
    history.push(`?${params.toString()}`);
  }, [nbByLine, nbByPage, page]);

  const totalPage = Math.ceil(elements.length / nbByPage);
  if (page > totalPage) {
    setPage(totalPage);
  }

  const pageStartIndex = (page - 1) * nbByPage;
  const pageElements = elements.slice(
    pageStartIndex,
    pageStartIndex + nbByPage
  );
  const minElementByCol = Math.floor(pageElements.length / nbByLine);
  let gridElements = [];
  for (let i = 0; i < nbByLine; i++) {
    gridElements = [...gridElements, pageElements.splice(0, minElementByCol)];
  }
  for (let i = 0; i < pageElements.length; i++) {
    gridElements[i].push(pageElements[i]);
  }

  const onNbByPageChange = e => {
    const totalPage = Math.ceil(elements.length / e.target.value);
    if (page > totalPage) {
      setPage(totalPage);
    }
    setNbByPage(e.target.value);
  };

  return (
    <div>
      <Tile className="is-vertical">
        {hideControl ? (
          <></>
        ) : (
          <Tile>
            <Tile className="is-2">
              <Tile className="is-child">
                <Level style={{ marginLeft: '1.5rem' }}>
                  <Level.Side>
                    <Level.Item>
                      <Form.Select value={nbByPage} onChange={onNbByPageChange}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </Form.Select>
                    </Level.Item>
                    <Level.Item>
                      <Button
                        size="small"
                        color="white"
                        data-tooltip="Première page"
                        onClick={() => setPage(1)}
                      >
                        <Icon
                          className="fa fa-angle-double-left"
                          alt="Première page"
                        />
                      </Button>
                    </Level.Item>
                    <Level.Item>
                      <Pagination
                        autoHide={false}
                        total={totalPage}
                        current={page}
                        onChange={newPage => setPage(newPage)}
                        showPrevNext={false}
                      />
                    </Level.Item>
                    <Level.Item>
                      <Button
                        size="small"
                        color="white"
                        data-tooltip="Dernière page"
                        onClick={() => setPage(totalPage)}
                      >
                        <Icon
                          className="fa fa-angle-double-right"
                          alt="Dernière page"
                        />
                      </Button>
                    </Level.Item>
                  </Level.Side>
                </Level>
              </Tile>
            </Tile>
            <Tile></Tile>
            <Tile className="is-6">
              <Tile className="is-child">
                <input
                  className="slider is-fullwidth is-small is-primary"
                  step="1"
                  min="0"
                  max="5"
                  value={sliderValues.indexOf(nbByLine)}
                  onChange={e => setnbByLine(sliderValues[e.target.value])}
                  type="range"
                  style={{ margin: '0' }}
                />
              </Tile>
            </Tile>
            <Tile></Tile>
          </Tile>
        )}
      </Tile>
      <Columns className="is-mobile">
        {gridElements.map(colElements => (
          <Columns.Column
            className={`is-${12 / nbByLine}`}
            key={gridElements.indexOf(colElements)}
          >
            {colElements.map(element => (
              <ChildComponent
                key={colElements.indexOf(element)}
                {...getChildProps(element)}
              />
            ))}
          </Columns.Column>
        ))}
      </Columns>
    </div>
  );
};

export default ElementsDisplay;
