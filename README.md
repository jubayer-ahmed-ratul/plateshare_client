# 🍽️ PlateShare — Community Food Sharing Platform

PlateShare is a MERN Stack-based web application designed to reduce food waste by connecting food donors with people in need. Users can donate excess food, request food, and manage their contributions through a modern, responsive interface.

---

## 🌐 Live Demo
- **Frontend:** [Netlify Link](https://shareurfoodtocommunity.netlify.app/)  
- **Backend API:** [Vercel Link](https://plateshare-api-server.vercel.app)

---

## ✨ Features

### **User Authentication & Authorization**
- Firebase Authentication (Email/Password + Google Login)  
- JWT-secured backend routes  

### **CRUD Operations on Food Items**
- Add Food  
- View All Available Foods  
- Update Food  
- Delete Food  

### **Food Request System**
- Users can request food  
- Food owners can Accept or Reject requests  
- Status updates for Foods & Requests  

### **UI/UX**
- Responsive design using Tailwind CSS  
- Smooth animations using Framer Motion / AOS  
- SweetAlert2 for confirmations & alerts  

### **Image Hosting**
- Food image uploads handled via **imgbb**  

### **Deployment**
- Frontend hosted on **Netlify**  
- Backend hosted on **Vercel**

---

## 🛠 Technologies Used

### **Frontend**
- React.js  
- React Router  
- Tailwind CSS  
- Firebase Authentication  
- Axios  
- Framer Motion  
- SweetAlert2  

### **Backend**
- Node.js  
- Express.js  
- MongoDB  

### **Other Tools**
- imgbb (Image Upload)  
- Netlify (Frontend Hosting)  
- Vercel (Backend Hosting)  

---

## 📡 API Reference

### **Base URL**

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
| GET    | /my-foods | Get foods added by the logged-in user |
| GET    | /my-food-requests | Get all food requests made by logged-in user |

### **Food Request Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /foodRequests | Submit a request for a food item |
| GET    | /foodRequests/:id | Get all requests for a specific food (visible only to the food owner) |
| PATCH  | /foodRequests/accept/:id | Accept a food request |
| PATCH  | /foodRequests/reject/:id | Reject a food request |

---

## ⚙️ Environment Variables

### **Frontend (.env)**
