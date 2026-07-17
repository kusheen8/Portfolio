import { sendOwnerNotification, sendAutoReply } from '../services/emailService.js';
import { deleteUploadedFile } from '../middleware/upload.js';

const isDebug = () =>
  process.env.DEBUG_CONTACT === 'true' || process.env.NODE_ENV !== 'production';

const parseUserAgent = (ua = '') => {
  let browser = 'Unknown';
  let device = 'Desktop';

  if (/mobile|android|iphone|ipad/i.test(ua)) device = 'Mobile';
  else if (/tablet|ipad/i.test(ua)) device = 'Tablet';

  if (/edg\//i.test(ua)) browser = 'Microsoft Edge';
  else if (/chrome/i.test(ua) && !/edg/i.test(ua)) browser = 'Google Chrome';
  else if (/firefox/i.test(ua)) browser = 'Mozilla Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opr|opera/i.test(ua)) browser = 'Opera';

  return { browser, device };
};

export const submitContact = async (req, res, next) => {
  const file = req.file;

  console.log('[Contact] Request received — POST /api/contact');
  if (isDebug()) {
    console.log('[Contact] req.body:', req.body);
    console.log('[Contact] req.file:', file ? { name: file.originalname, size: file.size } : null);
  }

  try {
    const { name, email, phone, company, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      console.warn('[Contact] Missing required fields after validation:', {
        hasName: Boolean(name),
        hasEmail: Boolean(email),
        hasSubject: Boolean(subject),
        hasMessage: Boolean(message),
      });
    }

    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'Unknown';
    const userAgent = req.get('user-agent') || 'Unknown';
    const { browser, device } = parseUserAgent(userAgent);

    const emailData = {
      name,
      email,
      phone: phone || '',
      company: company || '',
      subject,
      message,
      date: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'short',
      }),
      ipAddress,
      browser,
      device,
      hasAttachment: Boolean(file),
    };

    console.log('[Contact] Preparing owner notification email');
    console.log('[Contact] Sending owner notification to:', process.env.CONTACT_EMAIL || 'kusheendhar@gmail.com');
    const ownerResult = await sendOwnerNotification(emailData, file);
    console.log('[Contact] Owner email sent — messageId:', ownerResult.messageId);

    console.log('[Contact] Preparing auto-reply email');
    console.log('[Contact] Sending auto-reply to:', email);
    const replyResult = await sendAutoReply({ name, email });
    console.log('[Contact] Auto-reply sent — messageId:', replyResult.messageId);

    if (file?.path) {
      deleteUploadedFile(file.path);
    }

    console.log('[Contact] Success — returning 200 to client');
    res.status(200).json({
      success: true,
      message: 'Email sent successfully.',
    });
  } catch (error) {
    console.error('[EMAIL] Failed to send email');
    console.error(error.stack || error);
    if (file?.path) {
      deleteUploadedFile(file.path);
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to send email.',
      error: error.message || String(error),
    });
  }
};
