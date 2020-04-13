import React from 'react';

const ImgUpload = props => {
  return (
    <>
      <div className="file is-small is-light">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            name="resume"
            accept="image/*"
            onChange={() => props.onUpload(event.target.files[0])}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
          </span>
        </label>
      </div>
    </>
  );
};

export default ImgUpload;
