import { Router } from 'express';

const bar = Router();

bar.use('*', (req, res) => res.send('foo'));

export default bar;
