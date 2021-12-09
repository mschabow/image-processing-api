import express, { Response, Router } from 'express';
import images from './api/images';

const router: Router = express.Router();

router.get('/', (res: Response) => {
  res.send('main api route');
});

router.use('/images', images);

export default router;
