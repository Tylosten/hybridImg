import React from 'react';
import { connect } from 'react-redux';
import { ConnectedImgCell } from './ImgCell';

export const ImgGrid = props => {
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
                  <ConnectedImgCell
                    key={props.colThemes.indexOf(col)}
                    col={col}
                    line={line}
                    edit={props.edit}
                  />
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    lineThemes: state.lineThemes,
    colThemes: state.colThemes,
  };
}

export const ConnectedImgGrid = connect(mapStateToProps)(ImgGrid);
