import multer from 'multer';
import path from 'path';

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // store files in "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

// File filter (optional: only allow images/pdf)
function fileFilter(req, file, cb) {
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDFs allowed!'), false);
  }
}

const upload = multer({ storage, fileFilter });

export default upload;
