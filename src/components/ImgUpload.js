import React from 'react';
import { File } from 'react-bulma-components';

export const ImgUpload = props => {
  return (
    <>
      <File size="small" color="light">
        <File.Label>
          <File.Input
            type="file"
            name="resume"
            accept="image/*"
            onChange={() => props.onUpload(event.target.files[0])}
          />
          <File.Cta>
            <File.Icon className="fas fa-upload" />
          </File.Cta>
        </File.Label>
      </File>
    </>
  );
};

export default ImgUpload;
