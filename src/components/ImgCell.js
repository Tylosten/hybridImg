import React, { useState } from 'react';
import ImgUpload from './ImgUpload';

const ImgCell = props => {
  const [imgUrl, setImgUrl] = useState('');

  const onImgUpload = imgFile => {
    const newUrl = './Images/' + imgFile.name;
    setImgUrl(newUrl);
  };

  const deleteImg = () => {};

  return (
    <td>
      <img
        className="image is-128x128"
        src={imgUrl}
        alt={`${props.col} / ${props.line}`}
      />
      <div
        className="field is-grouped"
        style={props.edit ? {} : { display: 'none' }}
      >
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

export default ImgCell;
