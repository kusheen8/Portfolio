import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Load backend/.env regardless of current working directory */
dotenv.config({ path: path.join(__dirname, '..', '.env') });

/**
 * Log SMTP config for debugging — never prints the full password.
 */
export const logSmtpConfig = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_EMAIL } = process.env;

  const mask = (value) => {
    if (!value) return '(not set)';
    if (value.length <= 4) return '****';
    return `${value.slice(0, 2)}${'*'.repeat(Math.min(value.length - 4, 12))}${value.slice(-2)}`;
  };

  const port = Number(SMTP_PORT) || 465;
  const secure =
    SMTP_SECURE === 'true' || SMTP_SECURE === '1' ? true : port === 465;

  console.log('\n── SMTP configuration (safe preview) ──');
  console.log('  .env path:     ', path.join(__dirname, '..', '.env'));
  console.log('  SMTP_HOST:     ', SMTP_HOST || '(not set)');
  console.log('  SMTP_PORT:     ', SMTP_PORT || '(not set)', `→ secure=${secure}`);
  console.log('  SMTP_USER:     ', SMTP_USER || '(not set)');
  console.log('  SMTP_PASS:     ', mask(SMTP_PASS), SMTP_PASS ? `(length: ${SMTP_PASS.length})` : '');
  console.log('  CONTACT_EMAIL: ', CONTACT_EMAIL || '(not set)');
  console.log('  cwd:           ', process.cwd());

  if (SMTP_PASS && SMTP_PASS.length !== 16) {
    console.warn('  ⚠ App Passwords are usually exactly 16 characters. Yours is', SMTP_PASS.length);
  }
  if (SMTP_PASS && /[\s"']/.test(SMTP_PASS)) {
    console.warn('  ⚠ Password contains spaces or quotes — remove them from .env');
  }
  if (SMTP_USER && SMTP_USER.includes(' ')) {
    console.warn('  ⚠ SMTP_USER contains spaces — use full email only');
  }

  console.log('────────────────────────────────────────\n');

  return { port, secure };
};
