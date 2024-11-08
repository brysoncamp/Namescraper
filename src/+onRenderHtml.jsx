import React from 'react'; // Import React
import { escapeInject, dangerouslySkipEscape } from 'vike/server';
import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer
//import { StaticRouter } from 'react-router-dom/server'; // Import StaticRouter for SSG
import App from './App';

export function onRenderHtml(pageContext) {
  const urlPathname = pageContext.urlPathname || pageContext.urlOriginal?.pathname;

  console.log("urlPathname", urlPathname);
  if (!urlPathname) {
    throw new Error("urlPathname is undefined in pageContext");
  }

  const pageHtml = ReactDOMServer.renderToString(
    <App pageContext={pageContext} />
  );

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${pageContext.pageTitle || 'My App'}</title>
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
}
