import nodemailer from 'nodemailer';
import { buildOwnerEmailHtml, buildAutoReplyHtml } from './emailTemplates.js';
import { logSmtpConfig } from '../config/env.js';

let transporter = null;

const isDebug = () =>
  process.env.DEBUG_CONTACT === 'true' || process.env.NODE_ENV !== 'production';

const debugLog = (...args) => {
  if (isDebug()) console.log('[Email Debug]', ...args);
};

const buildTransportOptions = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      'Email configuration missing. Create backend/.env from .env.example and set SMTP credentials.'
    );
  }

  const port = Number(SMTP_PORT) || 465;
  const secure =
    SMTP_SECURE === 'true' || SMTP_SECURE === '1' ? true : port === 465;

  return {
    host: SMTP_HOST,
    port,
    secure,
    auth: {
      user: SMTP_USER.trim(),
      pass: SMTP_PASS.trim(),
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
    ...(port === 587 && {
      requireTLS: true,
      tls: { minVersion: 'TLSv1.2' },
    }),
  };
};

const getTransporter = () => {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport(buildTransportOptions());
  return transporter;
};

export const resetTransporter = () => {
  transporter = null;
};

export const verifyEmailConnection = async () => {
  logSmtpConfig();
  const transport = getTransporter();
  await transport.verify();
};

const logSendResult = (label, info, mailOptions) => {
  debugLog(`${label} — sendMail result:`, {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    response: info.response,
  });
  debugLog(`${label} — mail options (safe):`, {
    from: mailOptions.from,
    to: mailOptions.to,
    replyTo: mailOptions.replyTo,
    subject: mailOptions.subject,
    hasHtml: Boolean(mailOptions.html),
    hasText: Boolean(mailOptions.text),
    attachmentCount: mailOptions.attachments?.length ?? 0,
  });
};

export const sendOwnerNotification = async (data, attachment) => {
  const transport = getTransporter();
  const contactEmail = process.env.CONTACT_EMAIL?.trim() || 'kusheendhar@gmail.com';
  const smtpUser = process.env.SMTP_USER.trim();

  const attachmentName = attachment?.originalname || '';

  const plainText = [
    `Name: ${data.name}`,
    `Email Address: ${data.email}`,
    `Phone Number: ${data.phone?.trim() ? data.phone : 'Not Provided'}`,
    `Company: ${data.company?.trim() ? data.company : 'Not Provided'}`,
    `Subject: ${data.subject}`,
    '',
    'Message:',
    data.message,
    '',
    `Attachment: ${attachmentName || 'No Attachment'}`,
  ].join('\n');

  const mailOptions = {
    from: `"Portfolio Contact" <${smtpUser}>`,
    to: contactEmail,
    replyTo: data.email,
    subject: `New Contact Form Submission - ${data.subject}`,
    text: plainText,
    html: buildOwnerEmailHtml({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      subject: data.subject,
      message: data.message,
      attachmentName,
    }),
    attachments: attachment
      ? [
          {
            filename: attachment.originalname,
            path: attachment.path,
          },
        ]
      : [],
  };

  console.log('[EMAIL] Sending email...');
  console.log('[EMAIL] From:', mailOptions.from);
  console.log('[EMAIL] To:', mailOptions.to);
  console.log('[EMAIL] Reply-To:', mailOptions.replyTo);
  console.log('[EMAIL] Subject:', mailOptions.subject);

  try {
    const info = await transport.sendMail(mailOptions);
    console.log('[EMAIL] Email sent successfully');
    console.log('Message ID:', info.messageId);
    console.log('Accepted:', info.accepted);
    console.log('Response:', info.response);
    logSendResult('Owner notification', info, mailOptions);
    return info;
  } catch (error) {
    console.error('[EMAIL] Failed to send email');
    console.error(error.stack || error);
    throw error;
  }
};

export const sendAutoReply = async ({ name, email }) => {
  const transport = getTransporter();
  const portfolioUrl = process.env.PORTFOLIO_URL || 'https://portfolio-psi-ecru-67.vercel.app';
  const linkedinUrl = 'https://www.linkedin.com/in/kusheen-dhar-129ab22b6/';
  const githubUrl = 'https://github.com/kusheen8';

  const mailOptions = {
    from: `"Kusheen Dhar" <${process.env.SMTP_USER.trim()}>`,
    to: email,
    subject: 'Thanks for contacting me!',
    text: `Hi ${name},\n\nThank you for reaching out. I have received your message and will get back to you as soon as possible.\n\nBest Regards,\nKusheen Dhar`,
    html: buildAutoReplyHtml({ name, portfolioUrl, linkedinUrl, githubUrl }),
  };

  debugLog('Calling transporter.sendMail (auto-reply)...');
  debugLog('Email options (safe):', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
  });

  const info = await transport.sendMail(mailOptions);
  logSendResult('Auto-reply', info, mailOptions);
  return info;
};
