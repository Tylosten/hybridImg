import React, { useState } from 'react';
import {
  Tile,
  Pagination,
  Form,
  Level,
  Icon,
  Button,
} from 'react-bulma-components';

export const ElementsDisplay = ({
  ChildComponent,
  getChildProps,
  elements,
  byLine,
  hideControl,
}) => {
  getChildProps = getChildProps || (() => ({}));

  const sliderValues = [12, 6, 4, 3, 2, 1];
  const [nbByLine, setnbByLine] = useState(byLine || 4);
  const [page, setPage] = useState(1);
  const [nbByPage, setNbByPage] = useState(50);
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
        <Tile>
          {gridElements.map(colElements => (
            <Tile
              key={gridElements.indexOf(colElements)}
              className="is-vertical"
            >
              {colElements.map(element => (
                <Tile
                  key={colElements.indexOf(element)}
                  className={'is-parent'}
                >
                  <Tile className="is-child">
                    <ChildComponent {...getChildProps(element)} />
                  </Tile>
                </Tile>
              ))}
              <Tile></Tile>
            </Tile>
          ))}
        </Tile>
      </Tile>
    </div>
  );
};

export default ElementsDisplay;
