import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import env from './env.json';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  server.get('/api/auth', async (req, res) => {
    const { code, state } = req.query
    console.log(state, code);
    console.log(req.query);
    
    const paramaters = {
      client_id: env.AUTH.OAUTH_APPLICATION_ID,
      client_secret: env.AUTH.OAUTH_KEY,
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${req.protocol}://${req.headers.host}/api/auth`,
    }
    
    const url = new URL('https://gitlab.lnu.se/oauth/token?')
    url.search = new URLSearchParams(paramaters as any).toString()
    // console.log(url);
    console.log(url.search);
    
    
    const response = await fetch(url.toString(), {
      method: 'POST',
    })
    const data = await response.json()
    console.log(data);
    
    res.redirect('/profile') 
  })
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
