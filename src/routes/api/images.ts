import express, { Request, Response, Router } from 'express';

import { processImageRequest, validateData } from '../../Helpers/imageHelper';
import { strings } from '../../Helpers/strings';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  console.log(`\n\nRequest Received: ${req.originalUrl}`);
  const name = req.query.name as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  let format = '';
  if (req.query.format !== undefined) {
    format = req.query.format as string;
  } else format = 'jpg';

  const validationResult: string | undefined = validateData(
    name,
    width,
    height,
    format
  );

  if ((validationResult as string) !== strings.validatedSuccess) {
    res.status(400).send(`Error: ${validationResult as string}`);
    console.log(`Error: ${validationResult as string}`);
  } else {
    const response: string[] | undefined = await processImageRequest(
      name,
      width,
      height,
      format
    );
    const r = response as string[];
    const status = r[0];
    const newFilePath = r[1];

    if (status === strings.successNew || status === strings.successCached) {
      console.log('Sending File');
      res.sendFile(newFilePath);
      console.log('File Sent');
    } else {
      res.status(400).send(status);
      console.log(`Error: ${status}`);
    }
  }
});

export default router;
