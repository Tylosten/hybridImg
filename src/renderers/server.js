import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import StateApi from 'store';
import { App } from 'components/App';

export async function serverRenderer(url, data) {
  const store = new StateApi({
    ...data,
  });

  const initialData = {
    appName: 'Images hybrides',
    ...data,
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
