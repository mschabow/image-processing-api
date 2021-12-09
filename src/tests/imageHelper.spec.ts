import fs from 'fs';

import {
  processImageRequest,
  validateData,
  createScaledFolder,
  getCreatedFileName,
  clearCache
} from '../Helpers/imageHelper';
import { strings } from '../Helpers/strings';

describe('Request Validation Tests', () => {
  const name = 'encenadaport.jpg';
  const width = '900';
  const height = '600';
  const format = 'png';
  it('Expect success with default values', () => {
    expect(validateData(name, width, height, format)).toEqual(
      strings.validatedSuccess
    );
  });
  it('Expect invalid width with negative width', () => {
    expect(validateData(name, '-600', height, format)).toEqual(
      strings.invalidWidth
    );
  });
  it('Expect invalid height with NaN height', () => {
    expect(validateData(name, width, 'height', format)).toEqual(
      strings.invalidHeight
    );
  });
});

describe('Process Image Tests', () => {
  it('Expect new resized file created after cache cleared', async () => {
    console.log('Removing Cache Directory and Contents');
    clearCache();
    createScaledFolder();
    await processImageRequest('fjord.jpg', '600', '800', 'jpg');
    expect(fs.existsSync(getCreatedFileName())).toEqual(true);
  });

  it('Expect cached file from same request', async () => {
    const response: string[] | undefined = await processImageRequest(
      'fjord.jpg',
      '600',
      '800',
      'jpg'
    );
    expect(fs.existsSync(getCreatedFileName())).toEqual(true);
    const r = response as string[];
    const status = r[0];
    expect(status === strings.successCached);
  });

  it('Expect new file with different format type', async () => {
    const response: string[] | undefined = await processImageRequest(
      'fjord.jpg',
      '600',
      '800',
      'png'
    );
    expect(fs.existsSync(getCreatedFileName())).toEqual(true);
    const r = response as string[];
    const status = r[0];
    expect(status === strings.successNew);
  });

  it('Expect file not founderror', async () => {
    const response: string[] | undefined = await processImageRequest(
      'fjords.jpg',
      '600',
      '800',
      'jpg'
    );
    const r = response as string[];
    const status = r[0];
    expect(status === strings.errorOriginalFileNotFound);
  });

  it('Expect incompatible type error from conversion type', async () => {
    const response: string[] | undefined = await processImageRequest(
      'fjord.jpg',
      '600',
      '800',
      'jpg2'
    );
    const r = response as string[];
    const status = r[0];
    expect(status === strings.errorIncompatibleType);
  });

  it('Expect incompatible type error from original type', async () => {
    const response: string[] | undefined = await processImageRequest(
      'fjord.jpg2',
      '600',
      '800',
      'jpg'
    );
    const r = response as string[];
    const status = r[0];
    expect(status === strings.errorIncompatibleType);
  });
});
