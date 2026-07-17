import multer from 'multer';
import { deleteUploadedFile } from './upload.js';

export const errorHandler = (err, req, res, _next) => {
  if (req.file?.path) {
    deleteUploadedFile(req.file.path);
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File too large. Maximum size is 10MB.',
    });
  }

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message?.includes('File type') || err.message?.includes('MIME')) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  console.error('[Contact Error]', err.message);
  console.error(err.stack);

  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message:
      status === 500
        ? 'Unable to send message right now. Please try again later or email kusheendhar@gmail.com directly.'
        : err.message,
  });
};
