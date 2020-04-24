import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';

const upload_path = '/Images';
const resizeMax = 300;

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

export const uploadImage = upload.single('file');

export const resizeImage = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  const filepath = `${upload_path}/${uuid()}.png`;
  await sharp(req.file.buffer)
    .resize(resizeMax, resizeMax, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFile('public' + filepath);

  req.filepath = filepath;
  next();
};
