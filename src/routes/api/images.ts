import express from 'express';

import { processImageRequest, validateData } from '../../Helpers/imageHelper';
import { strings } from '../../Helpers/strings';

const images = express.Router();

images.get('/', async (req, res) => {
  console.log(`\n\nRequest Received: ${req.originalUrl}`);
  const name = req.query.name as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  let format: string = '';
  if (req.query.format !== undefined) {
    format = req.query.format as string;
  } else format = 'jpg';

  const validationResult: string | undefined = validateData(
    name,
    width,
    height,
    format
  );

  if ((validationResult as String) !== strings.validatedSuccess) {
    res.statusMessage = validationResult as string;
    res.sendStatus(400);
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
      res.statusMessage = status;
      res.sendStatus(400);
      console.log(`Error: ${status}`);
    }
  }
});

export default images;
