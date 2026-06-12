# 🚀 EmlyAI

EmlyAI is an AI-powered job application automation platform that helps job seekers analyze resumes, match them with job descriptions, generate personalized application emails and cover letters, and send applications directly through Gmail.

The goal of EmlyAI is to reduce the time spent on repetitive job application tasks and improve application quality using AI.

---

## ✨ Features

### 📄 Resume Management

* Upload multiple resumes (PDF)
* Store and manage resumes securely
* Rename, preview, and delete resumes
* Resume text extraction for AI processing

### 🤖 AI Resume Analysis

* ATS-style resume analysis
* Resume vs Job Description matching
* Match score generation
* Strength identification
* Missing skills detection
* Improvement suggestions

### 🎯 Best Resume Selection

* Compare multiple resumes against a Job Description
* AI automatically selects the most relevant resume
* Match score and reasoning provided

### ✉️ AI Email Generation

* Generate personalized application emails
* Tailored according to:

  * Resume
  * Job Description
  * Company Name
* Professional subject line generation

### 📝 AI Cover Letter Generator

* Customized cover letters
* Company-specific content
* Resume-based personalization

### ⚡ One Click Apply

* Select best resume automatically
* Generate email content
* Preview before sending
* Edit email content
* Send directly through Gmail

### 📬 Gmail Integration

* Google OAuth Authentication
* Secure Gmail API integration
* No App Password required
* Send emails directly from user's Gmail account

### 📊 Email History

* Track sent applications
* View email subjects and recipients
* Application history dashboard

### 🔒 Authentication

* JWT Authentication
* Google Login
* Protected Routes
* Secure Cookie-based sessions

---

## 🏗️ System Architecture

```text
React Frontend
      │
      ▼
Node.js + Express API
      │
      ├── MongoDB
      ├── Gemini AI
      ├── Gmail API
      └── Google OAuth
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Framer Motion
* Axios
* React Hot Toast
* Lucide React

### Backend

* Node.js
* Express.js
* JWT
* Multer
* PDF Parse
* Google APIs
* Gemini AI SDK

### Database

* MongoDB
* Mongoose

### AI

* Google Gemini 2.5 Flash

### Authentication

* JWT Authentication
* Google OAuth 2.0

### Email

* Gmail API

### DevOps & Deployment

* Docker
* Docker Compose
* Nginx
* AWS EC2
* GitHub Actions CI/CD

---

## 📁 Project Structure

```text
client/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   └── utils/

server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/

uploads/
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

GEMINI_API_KEY=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GOOGLE_REDIRECT_URI=

CLIENT_URL=

SERVER_URL=
```

### Frontend (.env)

```env
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

---

## 🚀 Local Setup

### Clone Repository

```bash
git clone <repository-url>

cd emly-ai
```

### Backend Setup

```bash
cd server

npm install

npm run dev
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## 🐳 Docker Setup

### Build Containers

```bash
docker compose up --build
```

### Run Detached

```bash
docker compose up -d
```

### Stop

```bash
docker compose down
```

---

## ☁️ Deployment

### Infrastructure

* AWS EC2
* Nginx Reverse Proxy
* Docker Containers
* GitHub Actions CI/CD

### CI/CD Flow

```text
Push to GitHub
      │
      ▼
GitHub Actions
      │
      ▼
Docker Image Build
      │
      ▼
Push to Docker Hub
      │
      ▼
SSH Deployment to EC2
      │
      ▼
Docker Compose Pull & Restart
```

---

## 📈 Benefits

### Before EmlyAI

* Manual resume selection
* Manual email writing
* Manual attachment handling
* 10–15 minutes per application

### After EmlyAI

* AI resume selection
* AI-generated emails
* Gmail integration
* Application in a few clicks

---

## 🔮 Future Improvements

* Job board integrations
* Bulk application support
* Resume optimization suggestions
* Application tracking dashboard
* Interview preparation assistant
* AI-powered networking outreach
* Analytics & reporting
* Multi-LLM support (Gemini, OpenAI, Claude)

---

## 👨‍💻 Author

Raj Sharma

LinkedIn:
https://www.linkedin.com/in/raj-sharma9975/

GitHub:
https://github.com/renchooz

---

## ⭐ Support

If you found this project useful, consider giving it a star and sharing your feedback.
