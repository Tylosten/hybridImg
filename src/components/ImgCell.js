import React from 'react';

const ImgCell = props => {
  const onImgUpload = () => {};

  const deleteImg = () => {};

  return (
    <td>
      <img
        className="image is-128x128"
        src=""
        alt={`${props.col} / ${props.line}`}
      />
      <div
        className="field is-grouped"
        style={props.edit ? {} : { display: 'none' }}
      >
        <div className="control">
          <button className="button is-small is-light" onClick={onImgUpload}>
            <span className="icon">
              <i className="fas fa-upload"></i>
            </span>
          </button>
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

export default ImgCell;
