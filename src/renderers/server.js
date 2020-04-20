import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import axios from 'axios';

import config from 'server/config';
import StateApi from 'store';
import { App } from 'components/App';

export async function serverRenderer(url) {
  const resp = await axios.get(`http://${config.host}:${config.port}/data`);
  const store = new StateApi({
    data: resp.data,
  });

  const initialData = {
    appName: 'Images hybrides',
    data: resp.data,
  };

  const pageData = {
    title: `Hello ${initialData.appName}`,
  };

  const context = {};

  return Promise.resolve({
    initialData,
    initialMarkup: ReactDOMServer.renderToString(
      <StaticRouter location={url} context={context}>
        <App store={store} />
      </StaticRouter>
    ),
    pageData,
  });
}
