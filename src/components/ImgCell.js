import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import ImgUpload from './ImgUpload';
const url = 'http://localhost:4242';

export const ImgCell = ({ line, col, hybrid, edit }) => {
  const [author, setAuthor] = useState('Mag');

  const saveHybrid = async () => {
    const res = await axios.post('/hybrids/save', { hybrid });
    console.info('Saved hybrid in db', res);
  };

  const onImgUpload = async imgFile => {
    hybrid.url = './Images/' + imgFile.name;
    if (!hybrid.id) {
      hybrid.id = uuid();
      hybrid.tags = [col, line];
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
        alt={`${col} / ${line}`}
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
  const hybridCandidates = state.hybrids.filter(
    hybrid =>
      hybrid.tags.includes(ownProps.line) && hybrid.tags.includes(ownProps.col)
  );
  const hybrid =
    hybridCandidates.length === 0 ? { url: '' } : hybridCandidates[0];

  return {
    line: ownProps.line,
    col: ownProps.col,
    edit: ownProps.edit,
    hybrid: hybrid,
  };
}

export const ConnectedImgCell = connect(mapStateToProps)(ImgCell);
