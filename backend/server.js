/**
 * Portfolio Contact API Server
 *
 * Before running:
 *   1. Copy backend/.env.example → backend/.env
 *   2. Add your Gmail address to SMTP_USER
 *   3. Add your Gmail App Password to SMTP_PASS
 *      (Generate at: https://myaccount.google.com/apppasswords)
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import './config/env.js';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import { verifyEmailConnection } from './services/emailService.js';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(apiRateLimiter);

app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/contact', contactRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await verifyEmailConnection();
    console.log('✓ Gmail SMTP connection verified');
  } catch (err) {
    console.warn('⚠ SMTP connection failed:', err.message.split('\n')[0]);
    if (err.code === 'EAUTH' || err.message.includes('535')) {
      console.warn('  → 535 BadCredentials: wrong App Password or wrong SMTP_USER account.');
      console.warn('  → Run: npm run check:smtp');
      console.warn('  → Regenerate App Password: https://myaccount.google.com/apppasswords');
    } else if (err.message.includes('ETIMEDOUT') && process.env.SMTP_PORT === '587') {
      console.warn('  → Port 587 blocked? Try SMTP_PORT=465 in backend/.env');
    }
  }

  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Contact API: POST http://localhost:${PORT}/api/contact`);
  });
};

startServer();
