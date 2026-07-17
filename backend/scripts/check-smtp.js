/**
 * Standalone SMTP diagnostic — run: npm run check:smtp
 * Does NOT print your full App Password.
 */
import nodemailer from 'nodemailer';
import { logSmtpConfig } from '../config/env.js';

const run = async () => {
  logSmtpConfig();

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    console.error('❌ SMTP_USER or SMTP_PASS missing in backend/.env');
    process.exit(1);
  }

  const port = Number(SMTP_PORT) || 465;
  const secure =
    SMTP_SECURE === 'true' || SMTP_SECURE === '1' ? true : port === 465;

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: { user: SMTP_USER.trim(), pass: SMTP_PASS.trim() },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
  });

  try {
    await transport.verify();
    console.log('✅ SMTP authentication successful on port', port);
    process.exit(0);
  } catch (err) {
    console.error('❌ SMTP failed:', err.message.split('\n')[0]);
    if (err.code === 'EAUTH' || String(err.message).includes('535')) {
      console.error('\n535 BadCredentials checklist:');
      console.error('  1. SMTP_USER must be the SAME Gmail that created the App Password');
      console.error('  2. SMTP_PASS must be a 16-char App Password — NOT your login password');
      console.error('  3. Regenerate at https://myaccount.google.com/apppasswords');
      console.error('  4. No quotes around values in .env (SMTP_PASS=abcd... not "abcd...")');
      console.error('  5. Restart backend after editing .env (Ctrl+C then npm start)');
      console.error('  6. Advanced Protection accounts cannot use App Passwords');
    }
    process.exit(1);
  }
};

run();
