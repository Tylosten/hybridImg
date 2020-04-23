import React, { useState } from 'react';
import { Tile } from 'react-bulma-components';

export const ElementsDisplay = ({
  ChildComponent,
  getChildProps,
  elements,
  byLine,
  hideSlider,
}) => {
  getChildProps = getChildProps || (() => ({}));

  const sliderValues = [12, 6, 4, 3, 2, 1];
  const [nbByLine, setnbByLine] = useState(byLine || 4);

  const minElementByCol = Math.floor(elements.length / nbByLine);

  elements = [...elements];
  let gridElements = [];
  for (let i = 0; i < nbByLine; i++) {
    gridElements = [...gridElements, elements.splice(0, minElementByCol)];
  }
  for (let i = 0; i < elements.length; i++) {
    gridElements[i].push(elements[i]);
  }

  return (
    <div>
      <Tile className="is-vertical">
        {hideSlider ? (
          <></>
        ) : (
          <Tile>
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
