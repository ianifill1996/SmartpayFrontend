# SmartPay Frontend

SmartPay is a modern and responsive payment tracking application built with React 19, Vite, and Context API. It allows users to register, log in, and manage personal payments, with smart categorization powered by OpenAI.

## Features
	•	JWT-based user authentication (Login / Register)
	•	Add, edit, and delete personal payments
	•	AI-assisted category detection using OpenAI
	• View and filter payment history
	• Protected routes and state management using Context API
	•	Built with React 19 and Vite for blazing-fast performance
	• Fully responsive and mobile-friendly design

 ## Technologies Used
	•	React 19 (Canary)
	•	Vite
	•	React Router DOM
	•	Axios
	•	Context API
	•	Plain CSS
	•	OpenAI API

 # Getting Started

 ## Backend files
 (SmartpayBacked)([
](https://github.com/ianifill1996/SmartpayBackend)
 ## Prerequisites
	•	Node.js ^20.19.0 or >=22.12.0
	•	Backend running at http://localhost:5001/api or hosted (e.g. Render)

 ## Installation
git clone https://github.com/your-username/smartpay-frontend.git
cd smartpay-frontend
npm install

## Environment Variables
Create a .env file in the root:
VITE_BACKEND_URL=http://localhost:5001/api
VITE_OPENAI_KEY=your_openai_key

## Run Locally
npm run dev

# Deployment
To deploy on Netlify:
	1.	Push the frontend code to GitHub
	2.	Go to Netlify → New Site → Import from GitHub
	3.	Set the build settings:
	•	Build Command: npm run build
	•	Publish Directory: dist
	4.	Add your .env variables in Netlify’s UI
	5.	Deploy 

# File Structure
src/
├── api.js
├── App.jsx
├── main.jsx
├── index.css
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   └── HomePage.jsx
├── components/
│   ├── NavBar.jsx
│   ├── PaymentForm.jsx
│   ├── PaymentList.jsx
│   └── ProtectedRoutes.jsx
└── context/
    └── AuthContext.jsx

# License

This project is for educational and portfolio use. Contact the author before reuse in commercial settings.
