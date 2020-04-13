import React from 'react';
import ImgCell from './ImgCell';

const ImgGrid = props => {
  return (
    <section className="table-container">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th></th>
            {props.colThemes.map(col => (
              <th key={props.colThemes.indexOf(col)}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {// First head column containing line themes names
            props.lineThemes.map(line => (
              <tr key={props.lineThemes.indexOf(line)}>
                <th>{line}</th>
                {props.colThemes.map(col => (
                  <td key={props.colThemes.indexOf(col)}>
                    {col} / {line}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default ImgGrid;
