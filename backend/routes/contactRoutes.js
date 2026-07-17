import { Router } from 'express';
import { submitContact } from '../controllers/contactController.js';
import { uploadAttachment } from '../middleware/upload.js';
import { contactValidationRules, validateContact } from '../middleware/validateContact.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

const logIncoming = (req, _res, next) => {
  console.log(`[Contact] ${req.method} ${req.originalUrl} — incoming request`);
  next();
};

const handleUpload = (req, res, next) => {
  uploadAttachment(req, res, (err) => {
    if (err) {
      console.error('[Contact] Multer upload error:', err.message);
      return next(err);
    }
    next();
  });
};

router.post(
  '/',
  logIncoming,
  contactRateLimiter,
  handleUpload,
  contactValidationRules,
  validateContact,
  submitContact
);

export default router;
