import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

async function genRouter(): Promise<Router> {
  // obtain list of files in the routes directory
  const files = await promisify(fs.readdir)(__dirname);

  const router = Router();

  await Promise.all(
    files.map(async file => {
      const filepath = path.resolve(__dirname, file);

      // skip generator
      if (filepath === __filename) {
        return;
      }

      // skip non javascript files
      if (!/\.(t|j)s$/.test(filepath)) {
        return;
      }

      // load export from file
      const r = (await import(filepath)) as { default: Router };

      // check if export is a router
      if (!(Object.getPrototypeOf(r.default) === Router)) {
        return;
      }

      const name = file.substr(0, file.length - 3);
      router.use(`/${name}`, r.default);
    })
  );

  return router;
}

export default genRouter;
