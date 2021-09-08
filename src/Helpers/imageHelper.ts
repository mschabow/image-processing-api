import fs from 'fs';
import path from 'path';
import sharp, { FormatEnum } from 'sharp';
import { strings } from './strings';

let filename: string;
let extension: string = 'jpg';
let format: string = extension;
let width: string;
let height: string;
let baseFilePath: string;
let newFilePath: string;

const getResizedImage = async (
  filepath: string,
  width: string,
  height: string,
  newFilePath: string,
  format: string
) => {
  console.log('Creating New Resized File: ' + newFilePath);
  await sharp(filepath)
    .resize({
      width: parseInt(width),
      height: parseInt(height)
    })
    .toFormat(format as keyof FormatEnum)
    .toFile(newFilePath);
  console.log('Created File');
};

function splitFilename(input: string) {
  if (input.includes('.')) {
    const splitFilename: string[] = input.split('.');
    extension = splitFilename[splitFilename.length - 1];
    filename = input.replace('.' + extension, '');
  } else {
    filename = `${input}`;
    extension = 'jpg';
  }
  console.log(`Filename without extension: ${filename}`);
  console.log(`Old Extension: ${extension}`);
}

export async function processImageRequest(
  inputName: string,
  inputWidth: string,
  inputHeight: string,
  inputConversionFormat: string
): Promise<string[] | undefined> {
  width = inputWidth;
  height = inputHeight;
  let fileStatus: string = strings.errorFileConversion;

  if (!strings.validFormatTypes.includes(inputConversionFormat)) {
    fileStatus = strings.errorIncompatibleType;
  }
  splitFilename(inputName);
  setConversionFormat(inputConversionFormat);
  configureFilePaths();

  if (
    fileStatus !== strings.errorIncompatibleType &&
    strings.validFormatTypes.includes(extension)
  ) {
    fileStatus = strings.errorFileConversion; //if there is an error later, this will not get set to success.

    console.log('Searching for existing file: ' + newFilePath);
    if (fs.existsSync(newFilePath)) {
      fileStatus = strings.successCached;
      console.log(strings.resizedFileFound);
    } else {
      console.log('Exisitng resized file not found.');

      console.log(`Searching for original file: ${baseFilePath}`);
      if (!fs.existsSync(baseFilePath)) {
        fileStatus = strings.errorOriginalFileNotFound;
      } else {
        await getResizedImage(
          baseFilePath,
          width as string,
          height as string,
          newFilePath,
          format
        );
        fileStatus = strings.successNew;
      }
    }
  }
  return [fileStatus, newFilePath];
}

export function validateData(
  name: string,
  width: string,
  height: string,
  format: string
): string | undefined {
  let validationStatus: string = '';

  if (!strings.filenameRegEx.test(name))
    validationStatus += '-Invalid filename';
  if (!strings.integerRegEx.test(width))
    validationStatus += strings.invalidWidth;
  if (!strings.integerRegEx.test(height))
    validationStatus += strings.invalidHeight;

  if (format != undefined && !strings.validFormatTypes.includes(format))
    validationStatus += `-Invalid format: ${format}`;

  if (validationStatus == '') {
    validationStatus = strings.validatedSuccess;
  }

  //console.log(`Request Validation Status: ${validationStatus}`);

  return validationStatus;
}

export function createScaledFolder() {
  const imagePath = path.resolve(strings.imagesFolder);
  const scaledPath = path.join(imagePath, strings.scaledFolder);

  if (!fs.existsSync(scaledPath)) {
    fs.mkdirSync(scaledPath);
  }
}
function setConversionFormat(conversionFormat: string) {
  if (conversionFormat !== '' && conversionFormat != '') {
    format = conversionFormat;
  } else {
    format = extension;
  }

  console.log(`New Format: ${format}`);
}

function configureFilePaths() {
  const imagePath = path.resolve(strings.imagesFolder);
  const newFileName = `${filename}_${width}_${height}.${format}`;
  baseFilePath = path.join(imagePath, `${filename}.${extension}`);
  newFilePath = path.join(imagePath, strings.scaledFolder, newFileName);
}

export function getCreatedFileName() {
  return newFilePath;
}

export function clearCache() {
  fs.rmdirSync(path.resolve('images/scaled'), { recursive: true });
}
