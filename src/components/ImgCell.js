import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import ImgUpload from './ImgUpload';
const url = 'http://localhost:4242';

const ImgCell = props => {
  const [author, setAuthor] = useState('Mag');
  const [imgUrl, setImgUrl] = useState('');
  const [tags, setTags] = useState([props.col, props.line]);
  const [hybridId, setHybridId] = useState();

  const loadHybrid = async () => {
    const res = await axios.get(
      url + `/hybrids/find?author=${author}&tags=${tags}`
    );
    const hybrid = res.data[0];
    if (hybrid) {
      setImgUrl(hybrid.url);
      setHybridId(hybrid.id);
    }
  };

  useEffect(() => {
    loadHybrid();
  }, []);

  const createHybrid = async newUrl => {
    const hybrid = {
      id: uuid(),
      author,
      url: newUrl,
      tags,
    };
    const res = await axios.post('/hybrids/new', { hybrid });
    console.info('Created hybrid in db', res);
    setImgUrl(newUrl);
  };

  const updateHybrid = async newUrl => {
    const res = await axios.post('/hybrids/update', {
      hybrid: {
        id: hybridId,
        author,
        url: newUrl,
        tags,
      },
    });
    console.info('Updated hybrid in db', res);
    setImgUrl(newUrl);
  };

  const onImgUpload = async imgFile => {
    const newUrl = './Images/' + imgFile.name;
    hybridId ? updateHybrid(newUrl) : createHybrid(newUrl);
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
