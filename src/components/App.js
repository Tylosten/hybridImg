import React, { useState } from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';
import { ConnectedImgGrid } from './ImgGrid';

export function App({ initialData }) {
  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{initialData.appName}</h1>
            <h2 className="subtitle">
              Ici vous pouvez uploader vos fabuleux dessins.
            </h2>
          </div>
        </div>
      </section>

      <Provider store={store}>
        <ConnectedImgGrid edit={true} />
      </Provider>
    </>
  );
}
