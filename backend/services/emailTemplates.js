const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const baseStyles = `
  font-family: 'Segoe UI', Inter, Arial, sans-serif;
  line-height: 1.6;
  color: #1a1a2e;
`;

export const buildOwnerEmailHtml = ({
  name,
  email,
  phone,
  company,
  subject,
  message,
  attachmentName,
}) => {
  const phoneDisplay = phone?.trim() ? escapeHtml(phone) : 'Not Provided';
  const companyDisplay = company?.trim() ? escapeHtml(company) : 'Not Provided';
  const attachmentDisplay = attachmentName?.trim()
    ? escapeHtml(attachmentName)
    : 'No Attachment';

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8f9ff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9ff;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(124,58,237,0.15);">
        <tr>
          <td style="background:linear-gradient(135deg,#7c3aed,#9333ea);padding:28px 32px;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">New Contact Form Submission</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;${baseStyles}">
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              ${[
                ['Name', escapeHtml(name)],
                ['Email Address', `<a href="mailto:${escapeHtml(email)}" style="color:#7c3aed;">${escapeHtml(email)}</a>`],
                ['Phone Number', phoneDisplay],
                ['Company', companyDisplay],
                ['Subject', escapeHtml(subject)],
              ]
                .map(
                  ([label, value]) => `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #ede9fe;font-size:13px;color:#6b7280;width:130px;vertical-align:top;">${label}</td>
                  <td style="padding:10px 0;border-bottom:1px solid #ede9fe;font-size:14px;font-weight:500;">${value}</td>
                </tr>`
                )
                .join('')}
            </table>
            <div style="background:#f8f9ff;border-left:4px solid #7c3aed;border-radius:8px;padding:20px;margin-top:8px;">
              <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#7c3aed;font-weight:600;">Message</p>
              <p style="margin:0;white-space:pre-wrap;font-size:15px;color:#374151;">${escapeHtml(message)}</p>
            </div>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
              <tr>
                <td style="padding:10px 0;font-size:13px;color:#6b7280;width:130px;vertical-align:top;">Attachment</td>
                <td style="padding:10px 0;font-size:14px;font-weight:500;">${attachmentDisplay}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
};

export const buildAutoReplyHtml = ({ name, portfolioUrl, linkedinUrl, githubUrl }) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8f9ff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9ff;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(124,58,237,0.12);">
        <tr>
          <td style="background:linear-gradient(135deg,#7c3aed,#9333ea);padding:32px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;">Thank You for Reaching Out!</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 32px;${baseStyles}">
            <p style="font-size:16px;margin:0 0 16px;">Hi <strong>${escapeHtml(name)}</strong>,</p>
            <p style="font-size:15px;color:#4b5563;margin:0 0 16px;">
              Thank you for reaching out through my portfolio. I have successfully received your message
              and will get back to you as soon as possible.
            </p>
            <p style="font-size:15px;color:#4b5563;margin:0 0 28px;">
              In the meantime, feel free to explore my work or connect with me on social platforms.
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
              <tr>
                <td style="padding:0 8px;">
                  <a href="${escapeHtml(portfolioUrl)}" style="display:inline-block;padding:12px 20px;background:linear-gradient(135deg,#7c3aed,#9333ea);color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">Portfolio</a>
                </td>
                <td style="padding:0 8px;">
                  <a href="${escapeHtml(linkedinUrl)}" style="display:inline-block;padding:12px 20px;border:2px solid #7c3aed;color:#7c3aed;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">LinkedIn</a>
                </td>
                <td style="padding:0 8px;">
                  <a href="${escapeHtml(githubUrl)}" style="display:inline-block;padding:12px 20px;border:2px solid #7c3aed;color:#7c3aed;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">GitHub</a>
                </td>
              </tr>
            </table>
            <p style="margin:32px 0 0;font-size:15px;color:#374151;">
              Best Regards,<br/>
              <strong style="color:#7c3aed;">Kusheen Dhar</strong><br/>
              <span style="font-size:13px;color:#6b7280;">Full Stack Developer &amp; AI Integrator</span>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
