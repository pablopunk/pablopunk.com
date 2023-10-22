const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

const sourceDir = path.join(__dirname, '../../public/posts/images');
const targetDir = path.join(__dirname, '../../public/posts/thumbnails');

const THUMBNAIL_WIDTH = 70;

fs.readdir(sourceDir, (err: unknown, files: File[]) => {
  if (err) throw err;

  files.forEach(file => {
    Jimp.read(`${sourceDir}/${file}`)
      .then(image => {
        return image
          .resize(THUMBNAIL_WIDTH, Jimp.AUTO) // Keep original aspect ratio
          .quality(70) // Set JPEG quality
          .write(`${targetDir}/${path.parse(file).name}.jpg`); // Convert to .jpg format
      })
      .catch(err => console.log(err));
  });
});
