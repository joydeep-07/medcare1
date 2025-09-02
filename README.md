# Medical Appointment System - MERN Stack
## Overview
A full-stack medical appointment system where patients can book appointments and admins can manage the system.

## Features

### For Patients:
- Create account & login
- Book doctor appointments
- View appointment status
- Contact support
- Leave reviews

### For Admin (email: admin@gmail.com, password: paul):
- View all appointments
- Confirm/Cancel appointments (with email notifications)
- Manage support messages (reply via email)
- Add/Remove/Edit doctors

## Setup Instructions

1. Backend:
   - Navigate to backend folder
   - Run `npm install`
   - Create `.env` file (use `.env.example` as template)
   - Run `npm start`

2. Frontend:
   - Navigate to frontend folder
   - Run `npm install`
   - Run `npm run dev`

## Technologies Used
- MongoDB (Database)
- Express.js (Backend framework)
- React.js (Frontend)
- Node.js (Backend)
- Nodemailer (Email notifications)

## Environment Variables
Create a `.env` file in backend like this:

# MongoDB Connection
MONGO_URI= your mongo uri

# Server Port
PORT=5000

# Nodemailer Email Config
ADMIN_EMAIL=youremail@gmail.com
ADMIN_PASSWORD=your app password


## Admin Login
Email: admin@gmail.com
Password: paul