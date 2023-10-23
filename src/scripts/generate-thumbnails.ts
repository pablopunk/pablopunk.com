/* eslint-disable */
const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

const sourceDir = path.join(__dirname, "../../public/posts/images");
const targetDir = path.join(__dirname, "../../public/posts/thumbnails");

const THUMBNAIL_WIDTH = 70;

fs.readdir(sourceDir, (err: unknown, files: File[]) => {
  if (err) throw err;

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if ([".jpeg", ".jpg", ".png", ".bmp", ".gif"].includes(ext)) {
      Jimp.read(`${sourceDir}/${file}`)
        // @ts-ignore
        .then((image) => {
          return image
            .resize(THUMBNAIL_WIDTH, Jimp.AUTO) // Keep original aspect ratio
            .quality(70) // Set JPEG quality
            .blur(4) // Add blur
            .write(`${targetDir}/${path.parse(file).name}.jpg`); // Convert to .jpg format
        })
        .catch((err: Error) => console.log(err));
    }
  });
});
