Social-Media-Analytics-Dashboard

A modern full-stack Social Media Analytics Dashboard that provides real-time analytics and profile insights for YouTube, X (Twitter), and Instagram profiles.

Built using React, Vite, Node.js, Express.js, and Tailwind CSS, this platform allows users to search creators, influencers, and public profiles to instantly access audience metrics, engagement data, profile information, and content insights through a clean and responsive interface.

🌐 Live Website

🔗 Live Demo
https://social-media-analytics-dashboard-kjv4-17uhglx8e.vercel.app/

📌 Project Overview

The Social Media Analytics Dashboard is a full-stack web application designed to fetch and display social media analytics from multiple platforms through integrated APIs and real-time data extraction services.

Users can:

- Analyze YouTube channels
- Search X (Twitter) profiles
- Explore Instagram profile insights
- View engagement metrics
- Access profile metadata
- Explore recent content and statistics

The project follows a production-ready architecture with separate frontend and backend deployments, secured environment variables, API abstraction, responsive design, and scalable code organization.


✨ Core Features

📺 YouTube Analytics
- Search YouTube channels by name
- Subscriber count
- Total views
- Total uploaded videos
- Channel description
- Channel banner & thumbnails
- Top performing videos
- Topic/category extraction
- Upload playlist access


🐦 X (Twitter) Analytics
- Real-time X profile analytics
- Followers & following count
- Tweet statistics
- Verified badge detection
- Profile metadata
- Banner & avatar support
- Official API integration
- Fallback scraping support


📸 Instagram Analytics
- Instagram public profile analytics
- Followers & following count
- Media/post count
- Biography extraction
- Verification status
- Profile image support
- Recent posts preview
- Engagement metrics


🏗️ System Architecture

User Interface (React + Vite)
            ↓
Frontend API Requests
            ↓
Express.js Backend Server
            ↓
Third-Party APIs & Services
            ↓
Processed Analytics Response
            ↓
Frontend Visualization


🛠️ Tech Stack

Frontend
- React.js
- Vite
- Tailwind CSS
- Axios

Backend
- Node.js
- Express.js
- Axios
- dotenv
- CORS

APIs & Integrations
- YouTube Data API v3
- X (Twitter) API v2
- RapidAPI Instagram Scraper API

Deployment Platforms
- Vercel (Frontend)
- Render (Backend)
  

⚙️ Environment Variables

Backend .env

NODE_ENV=development
PORT=5000

YT_API_KEY=my_youtube_api_key
RAPID_API_KEY=my_rapidapi_key
BEARER_TOKEN=my_x_bearer_token

FRONTEND_URL=https://social-media-analytics-dashboard-kjv4-17uhglx8e.vercel.app/

Frontend .env

VITE_BACKEND_URL=https://social-analytics-api-bg60.onrender.com/

📦 Local Setup & Installation

1️⃣ Clone Repository

git clone https://github.com/PriyankaGouri123/Social-Media-Analytics-Dashboard.git


2️⃣ Navigate Into Project

cd Social-Media-Analytics-Dashboard


3️⃣ Install Backend Dependencies

cd backend
npm install


4️⃣ Install Frontend Dependencies

cd ../frontend
npm install


▶️ Running the Application

Start Backend Server

cd backend
npm start


Backend runs on:

http://localhost:5000

Start Frontend Server

cd frontend
npm run dev


Frontend runs on:

http://localhost:5173


🔌 API Endpoints

Root Health Check

GET /


YouTube Analytics

GET /api/youtube/mrbeast

X Analytics

GET /api/xstats/elonmusk

Instagram Analytics

GET /api/instagram/cristiano

🚀 Deployment

Frontend Deployment
- Hosted on Vercel

Backend Deployment
- Hosted on Render

Production Environment
- Environment variables securely managed
- CORS configured for production domains
- Production-ready Express server setup
- API keys protected using .env


🔒 Security & Best Practices

- Environment variables protected using .env
- .gitignore prevents sensitive file uploads
- API abstraction prevents exposing third-party APIs
- Error handling middleware implemented
- Production-ready CORS configuration
- Secure deployment architecture


📈 Future Enhancements

- User authentication
- Analytics history tracking
- Interactive data visualizations
- AI-generated profile insights
- Export reports as PDF/CSV
- Social profile comparison
- Trending analytics engine


📸 Screenshots

🏠 Home Page
<img width="1763" height="3153" alt="image" src="https://github.com/user-attachments/assets/3486a3e5-217e-43a8-88ed-38ae21bd55b9" />

📺 YouTube Analytics
<img width="1763" height="2829" alt="image" src="https://github.com/user-attachments/assets/bff03d08-1986-4147-8c2b-1a45b5cfab75" />

🐦 X Analytics
<img width="1763" height="1722" alt="image" src="https://github.com/user-attachments/assets/8e4130ba-88bf-49d3-8010-2ecd16f4e502" />

📸 Instagram Analytics
<img width="1763" height="1824" alt="image" src="https://github.com/user-attachments/assets/17ca6f0c-28a5-4472-9972-f5d9551ede3a" />

👩‍💻 Author

Priyanka Gouri

B.Tech CSE Student | Full Stack Developer | UI/UX Enthusiast

### Connect
- GitHub: https://github.com/PriyankaGouri123
- LinkedIn: https://www.linkedin.com/in/priyanka-gouri-515313268/

📄 License

This project is developed for educational, learning, and portfolio purposes.

⭐ Show Your Support

If you found this project useful, consider giving it a ⭐ on GitHub.
