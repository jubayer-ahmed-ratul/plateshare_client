# 🍽️ PlateShare — Community Food Sharing Platform

PlateShare is a MERN Stack-based web application designed to reduce food waste by connecting food donors with people in need. Users can donate excess food, request food, and manage their contributions through a modern, responsive interface.

---

## 🌐 Live Demo
- **Frontend:** [Netlify Link](https://shareurfoodtocommunity.netlify.app/)  
- **Backend API:** [Vercel Link](https://plateshare-api-server.vercel.app)

---

## ✨ Features

- **User Authentication & Authorization**: Firebase Email/Password + Google login, JWT-secured backend routes  
- **CRUD Operations on Food Items**: Add, view, update, delete food items  
- **Food Request System**: Request food, accept/reject requests, status updates  
- **UI/UX**: Responsive design using Tailwind CSS, animations using Framer Motion / AOS, SweetAlert2 alerts  
- **Image Hosting**: Food image uploads handled via **imgbb**  
- **Deployment**: Frontend on Netlify, Backend on Vercel  

---

## 🛠 Technologies Used

- **Frontend**: React.js, React Router, Tailwind CSS, Firebase Authentication, Axios, Framer Motion, SweetAlert2  
- **Backend**: Node.js, Express.js, MongoDB  
- **Other Tools**: imgbb (Image Upload), Netlify, Vercel  

---

## 📡 API Reference

### **Foods Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /foods | Get all available foods |
| GET    | /top-foods | Get top 6 foods sorted by highest quantity |
| GET    | /food/:id | Get specific food details |
| POST   | /foods | Add a new food item |
| DELETE | /delete-food/:id | Delete a food item |
| PATCH  | /update-food/:id | Update a food item |

### **User-Specific Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /my-foods | Get foods added by logged-in user |
| GET    | /my-food-requests | Get all food requests made by logged-in user |

### **Food Request Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /foodRequests | Submit a request for a food item |
| GET    | /foodRequests/:id | Get all requests for a specific food (visible only to food owner) |
| PATCH  | /foodRequests/accept/:id | Accept a food request |
| PATCH  | /foodRequests/reject/:id | Reject a food request |

---

## 💻 Local Development Setup

### **Prerequisites**
- Node.js (v14 or higher)  
- npm  
- MongoDB (local or Atlas)  
- Firebase Project  
- imgbb API Key  

---

### ** Backend Setup**

git clone <BACKEND_REPO_URL>
cd plateshare-backend
nodemon index.js
http://localhost:3000

### ** Frontend Setup**

git clone https://github.com/jubayer-ahmed-ratul/plateshare_client.git
cd plateshare_client
npm install
npm run dev


