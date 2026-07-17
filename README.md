# Portfolio — Full Stack

Modern portfolio with a React/Vite frontend and Express backend. The contact form sends real emails to your Gmail inbox via SMTP — no EmailJS, no fake forms.

🌐 **Live Demo:** [https://portfolio-psi-ecru-67.vercel.app/](https://portfolio-psi-ecru-67.vercel.app/)

## Project Structure

```
portfolio/
├── frontend/          # React + Vite UI
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express contact API
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   ├── uploads/       # Temporary file storage (auto-deleted)
│   ├── .env.example   # Copy to .env and fill in credentials
│   └── package.json
└── package.json       # Root scripts (run both apps)
```

## Features

- Dark/Light mode, Framer Motion animations, fully responsive
- **Production contact form** with file attachments (up to 10MB)
- HTML emails to you + automatic confirmation to the sender
- Rate limiting, Helmet, CORS, input sanitization, honeypot spam protection

---

## 1. Install Dependencies

From the project root:

```bash
npm run install:all
```

Or install separately:

```bash
cd backend && npm install
cd ../frontend && npm install
```

---

## 2. Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_16_char_app_password
CONTACT_EMAIL=kusheendhar@gmail.com
PORT=5000
FRONTEND_URL=http://localhost:5173,https://your-production-domain.com
PORTFOLIO_URL=https://your-production-domain.com
```

### Generate a Gmail App Password

1. Enable **2-Step Verification** on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Select **Mail** → **Other (Portfolio)** → Generate
4. Copy the 16-character password (no spaces) into `SMTP_PASS`
5. Set `SMTP_USER` to your Gmail address (`kusheendhar@gmail.com`)

> **Never commit `backend/.env`** — it is listed in `.gitignore`.

---

## 3. Run Development

From project root (runs backend + frontend together):

```bash
npm run dev
```

Or run separately:

```bash
# Terminal 1 — Backend (port 5000)
npm run dev:backend

# Terminal 2 — Frontend (port 5173)
npm run dev:frontend
```

- Frontend: http://localhost:5173
- API health: http://localhost:5000/api/health
- Contact endpoint: `POST http://localhost:5000/api/contact`

In development, Vite proxies `/api` requests to the backend automatically.

---

## 4. Production Build (Frontend)

```bash
cd frontend
npm run build
```

Output: `frontend/dist/`

For production, create `frontend/.env`:

```env
VITE_API_URL=https://yourdomain.com/api
```

---

## 5. Deploy on AWS EC2

### Backend

1. SSH into your EC2 instance
2. Clone the repo and install Node.js 18+
3. Configure `backend/.env` with Gmail SMTP credentials
4. Install dependencies: `cd backend && npm install`
5. Run with PM2:

```bash
npm install -g pm2
pm2 start server.js --name portfolio-api
pm2 save
pm2 startup
```

### Frontend

Build locally or on the server:

```bash
cd frontend && npm run build
```

Serve `frontend/dist/` with Nginx.

### Nginx Example

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # React frontend
    location / {
        root /var/www/portfolio/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API to Express
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        client_max_body_size 10M;
    }
}
```

Reload Nginx: `sudo nginx -t && sudo systemctl reload nginx`

Set `FRONTEND_URL` in `backend/.env` to your production domain.

---

## API Reference

### `POST /api/contact`

**Content-Type:** `multipart/form-data`

| Field        | Required | Description                    |
|-------------|----------|--------------------------------|
| name        | Yes      | Full name                      |
| email       | Yes      | Sender email                   |
| phone       | No       | Phone number                   |
| company     | No       | Company name                   |
| subject     | Yes      | Message subject                |
| message     | Yes      | Message body                   |
| attachment  | No       | PDF, DOC, DOCX, PNG, JPG, ZIP, TXT (max 10MB) |

**Response (200):**

```json
{
  "success": true,
  "message": "Your message has been sent successfully..."
}
```

---

## Tech Stack

**Frontend:** React 18, Vite, Framer Motion, React Icons  
**Backend:** Node.js, Express, Nodemailer, Multer, Helmet, express-rate-limit, express-validator, sanitize-html

---

## Security

- Credentials only in `backend/.env`
- Rate limit: 5 contact submissions per 15 min per IP
- Honeypot field for bot protection
- Input sanitization (XSS prevention)
- File type and size validation
- Uploaded files deleted after email is sent
