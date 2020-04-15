import React from 'react';
import { connect } from 'react-redux';
import HybridCell from './HybridCell';
import { TableContainer, Table } from 'react-bulma-components';

const GridDisplay = props => {
  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          {props.colThemes.map(col => (
            <th key={props.colThemes.indexOf(col)}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {// First head column containing line themes names
          props.lineThemes.map(line => (
            <tr key={props.lineThemes.indexOf(line)}>
              <th>{line.name}</th>
              {props.colThemes.map(col => (
                <HybridCell
                  key={props.colThemes.indexOf(col)}
                  col={col.id}
                  line={line.id}
                  edit={props.edit}
                  gridId={props.gridId}
                />
              ))}
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const grid = state.grids.find(grid => grid.id === id);
  return {
    lineThemes: state.themes.filter(theme =>
      grid.lineThemes.includes(theme.id)
    ),
    colThemes: state.themes.filter(theme => grid.colThemes.includes(theme.id)),
    gridId: id,
    edit: ownProps.edit,
  };
}

const ConnectedGridDisplay = connect(mapStateToProps)(GridDisplay);
export default ConnectedGridDisplay;
