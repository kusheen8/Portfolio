import { body, validationResult } from 'express-validator';
import sanitizeHtml from 'sanitize-html';

const sanitize = (value) =>
  sanitizeHtml(String(value ?? ''), {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();

export const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .customSanitizer(sanitize),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone must be under 20 characters')
    .customSanitizer(sanitize),

  body('company')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company must be under 100 characters')
    .customSanitizer(sanitize),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 3, max: 150 })
    .withMessage('Subject must be between 3 and 150 characters')
    .customSanitizer(sanitize),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters')
    .customSanitizer(sanitize),

  body('_website')
    .optional()
    .custom((value) => {
      if (value && String(value).trim() !== '') {
        throw new Error('Spam detected');
      }
      return true;
    }),
];

export const validateContact = (req, res, next) => {
  console.log('Received _website =', JSON.stringify(req.body._website));

  const honeypot = req.body._website;
  if (honeypot && String(honeypot).trim() !== '') {
    console.warn('[Contact] Spam detected — honeypot filled:', JSON.stringify(honeypot));
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: [{ field: '_website', message: 'Spam detected' }],
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn('[Contact] Validation failed:', errors.array());
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  console.log('[Contact] Validation passed');
  next();
};
