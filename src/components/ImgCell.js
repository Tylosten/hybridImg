import React, { useState } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { requestHybridSaving } from '../store/mutations';

// import ImgUpload from './ImgUpload';

const ImgCell = ({ lineTheme, colTheme, hybrid, edit, saveHybrid }) => {
  // const saveHybrid = () => {
  //   const res = await axios.post('/hybrids/save', { hybrid });
  //   console.info('Saved hybrid in db', res);
  // };

  const onHybridUpload = async imgFile => {
    // hybrid.url = './Images/' + imgFile.name;
    if (!hybrid.tags) {
      hybrid.tags = [colTheme.id, lineTheme.id];
    }
    hybrid.url = './Images/20200412_003859.jpg';
    saveHybrid(hybrid);
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
          <button className="button is-small is-light" onClick={onHybridUpload}>
            <span className="icon">
              <i className="fas fa-upload"></i>
            </span>
          </button>
          {/*<ImgUpload onUpload={onImgUpload} />*/}
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
    hybridCandidates.length === 0
      ? { url: '', grid: ownProps.gridId }
      : hybridCandidates[0];

  return {
    lineTheme,
    colTheme,
    edit: ownProps.edit,
    hybrid,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveHybrid(hybrid) {
      console.log(`Saving hybrid ${hybrid.grid}`);
      dispatch(requestHybridSaving(hybrid));
    },
  };
};

const ConnectedImgCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImgCell);
export default ConnectedImgCell;
