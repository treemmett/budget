/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-await-in-loop */
import WebpackDevServer, { Configuration } from 'webpack-dev-server';
import cypress from 'cypress';
import http from 'http';
import process from 'process';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

let frontEndServer: WebpackDevServer;

function isServerUp(hostname: string, port: number): Promise<boolean> {
  return new Promise(resolve => {
    const opt: http.RequestOptions = {
      hostname,
      port,
      timeout: 5000,
    };

    const req = http.request(opt, res => {
      res.on('data', () => resolve(true));
    });

    req.on('error', () => resolve(false));

    req.end();
  });
}

function timeout(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

async function startFrontend(): Promise<void> {
  const compiler = webpack(webpackConfig as Configuration);
  frontEndServer = new WebpackDevServer(compiler);
  frontEndServer.listen(3000);

  for (let i = 0; i < 20; i += 1) {
    await timeout(1000);
    const up = await isServerUp('localhost', 3000);
    if (up) {
      return;
    }
  }

  throw new Error('Front end failed to start in 20 seconds');
}

async function startup(): Promise<void> {
  const [frontendUp, backendUp] = await Promise.all([
    isServerUp('localhost', 3000),
    isServerUp('localhost', 8080),
  ]);

  if (!backendUp) {
    throw new Error('API not up. Please confirm API is running and try again.');
  }

  if (!frontendUp) {
    await startFrontend();
  }

  const results = await cypress.run({
    configFile: 'test/config.json',
  });

  if (frontEndServer) {
    frontEndServer.close();
  }

  if (results.totalFailed > 0) {
    process.exit(1);
  }
}

startup()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err.message);
    process.exit(2);
  });
