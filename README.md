<div align="center">
  <h1 align="center">✨ Modern 3D Developer Portfolio</h1>
  <p align="center">
    A visually stunning, full-stack developer portfolio featuring 3D graphics, smooth animations, and a secure admin dashboard.
  </p>
  <p align="center">
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" /></a>
    <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js" alt="Three.js" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node" /></a>
    <a href="https://mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
  </p>
</div>

---

## 🚀 Features

- **Immersive 3D Experience**: Integrated with `Three.js` and `@react-three/fiber` for stunning interactive 3D elements.
- **Smooth Animations**: High-performance micro-interactions and page transitions powered by `Framer Motion`.
- **Dynamic Content Management**: Fully functional secure admin dashboard (`/admin/login`) to manage projects, blog posts, and testimonials.
- **GitHub Integration**: Live GitHub activity calendar using `react-github-calendar`.
- **Cloud Media Storage**: Direct image and media uploads handling via `Cloudinary`.
- **Fully Responsive**: Carefully crafted UI using `Tailwind CSS` that looks perfect on desktops, tablets, and mobile devices.

## 🛠️ Technology Stack

### Frontend (`/client`)
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **3D & Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion
- **Icons & UI Components**: Lucide React, Recharts
- **Routing**: React Router DOM (v7)
- **Deployment**: Vercel

### Backend (`/server`)
- **Environment**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs
- **File Uploads**: Multer + Cloudinary Storage
- **Security**: CORS, Cookie-parser

## 📁 Project Structure

This is a monorepo containing both the frontend and backend applications.

```bash
├── client/          # Vite React Frontend
│   ├── src/         # React components, pages, and 3D scenes
│   ├── public/      # Static assets
│   └── vercel.json  # SPA routing configuration for Vercel
│
└── server/          # Node.js Express Backend
    ├── config/      # Database and Cloudinary configs
    ├── models/      # Mongoose schemas
    ├── routes/      # API endpoints
    ├── middleware/  # JWT auth & multer middlewares
    └── server.js    # Entry point
```

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- Cloudinary account credentials

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add your environment variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Start the development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal and navigate to the client folder:
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory (if needed for API URLs):
```env
VITE_API_URL=http://localhost:5000
```
Start the Vite development server:
```bash
npm run dev
```

## 🔒 Admin Dashboard
The portfolio includes a secure admin panel for managing the site content. 
- Navigate to `/admin/login`
- Authenticate using your admin credentials (handled via secure JWT cookies).
- Manage projects, update your resume, and handle messages.

## 🎨 Design & Inspiration
This portfolio was designed with a focus on modern web aesthetics—utilizing deep colors, glassmorphism, smooth gradients, and 3D elements to create a premium feel that wows visitors at first glance.

---
<div align="center">
  <i>Built with ❤️ by Dhruv</i>
</div>
