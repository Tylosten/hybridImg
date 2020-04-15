import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Image, Form, Button, Icon } from 'react-bulma-components';
// import axios from 'axios';
import * as mutations from '../store/mutations';

// import ImgUpload from './ImgUpload';

const HybridCell = props => {
  const {
    lineTheme,
    colTheme,
    id,
    grid,
    edit,
    createHybrid,
    setHybridUrl,
  } = props;
  const [url, setUrl] = useState(props.url);
  const onHybridUpload = async imgFile => {
    const newUrl = './Images/20200412_003859.jpg';
    setUrl(newUrl);
    if (!id) {
      createHybrid(newUrl, [lineTheme.id, colTheme.id], grid);
    } else {
      setHybridUrl(id, newUrl);
    }
  };

  const deleteImg = () => {};

  return (
    <td>
      <Image
        className="image is-128x128"
        src={url}
        alt={`${colTheme.name} / ${lineTheme.name}`}
      />
      <Form.Field
        className="is-grouped"
        style={edit ? {} : { display: 'none' }}
      >
        <Form.Control>
          <Button size="small" color="light" onClick={onHybridUpload}>
            <Icon className="fas fa-upload" />
          </Button>
          {/*<ImgUpload onUpload={onImgUpload} />*/}
        </Form.Control>
        <Form.Control>
          <Button size="small" color="light" onClick={deleteImg}>
            <Icon className="fas fa-trash" />
          </Button>
        </Form.Control>
      </Form.Field>
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

  return {
    lineTheme,
    colTheme,
    grid: ownProps.gridId,
    edit: ownProps.edit,
    id: hybridCandidates[0] ? hybridCandidates[0].id : undefined,
    url: hybridCandidates[0] ? hybridCandidates[0].url : undefined,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createHybrid(url, tags, grid) {
      dispatch(mutations.requestHybridCreating(url, tags, grid));
    },
    setHybridUrl(id, url) {
      dispatch(mutations.setHybridUrl(id, url));
    },
  };
};

const ConnectedHybridCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(HybridCell);
export default ConnectedHybridCell;
