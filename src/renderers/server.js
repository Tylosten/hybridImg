import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { App } from 'components/App';

export async function serverRenderer(url) {
  const initialData = {
    appName: 'Images hybrides',
  };

  const pageData = {
    title: `Hello ${initialData.appName}`,
  };

  const context = {};

  return Promise.resolve({
    initialData,
    initialMarkup: ReactDOMServer.renderToString(
      <StaticRouter location={url} context={context}>
        <App initialData={initialData} />
      </StaticRouter>
    ),
    pageData,
  });
}
