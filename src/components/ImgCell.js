import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import ImgUpload from './ImgUpload';
const url = 'http://localhost:4242';

const ImgCell = ({ lineTheme, colTheme, hybrid, edit }) => {
  const [author, setAuthor] = useState('Mag');

  const saveHybrid = async () => {
    const res = await axios.post('/hybrids/save', { hybrid });
    console.info('Saved hybrid in db', res);
  };

  const onImgUpload = async imgFile => {
    hybrid.url = './Images/' + imgFile.name;
    if (!hybrid.id) {
      hybrid.id = uuid();
      hybrid.tags = [colTheme.id, lineTheme.id];
      hybrid.author = author;
    }
    await saveHybrid();
  };

  const deleteImg = () => {};

  return (
    <td>
      <img
        className="image is-128x128"
        src={hybrid.url}
        alt={`${colTheme.name} / ${lineTheme.name}`}
      />
      <div className="field is-grouped" style={edit ? {} : { display: 'none' }}>
        <div className="control">
          <ImgUpload onUpload={onImgUpload} />
        </div>
        <div className="control">
          <button className="button is-small is-light" onClick={deleteImg}>
            <span className="icon">
              <i className="fas fa-trash"></i>
            </span>
          </button>
        </div>
      </div>
    </td>
  );
};

function mapStateToProps(state, ownProps) {
  const lineTheme = state.themes.find(theme => theme.id === ownProps.line);
  const colTheme = state.themes.find(theme => theme.id === ownProps.col);
  const hybridCandidates = state.hybrids.filter(hybrid => {
    const hasTags =
      hybrid.tags.includes(lineTheme.id) && hybrid.tags.includes(colTheme.id);
    const isInGrid = !ownProps.gridId || hybrid.grid === ownProps.gridId;
    return hasTags && isInGrid;
  });
  const hybrid =
    hybridCandidates.length === 0 ? { url: '' } : hybridCandidates[0];

  return {
    lineTheme,
    colTheme,
    edit: ownProps.edit,
    hybrid,
  };
}

const ConnectedImgCell = connect(mapStateToProps)(ImgCell);
export default ConnectedImgCell;
