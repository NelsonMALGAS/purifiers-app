# 💧AquaSync 

## 📖 Overview  
AquaSync is a smart water purifier management system that helps you monitor usage, receive maintenance alerts, and manage inventory — all in real time from your phone or desktop.  

## 🎯 Key Features  
✅ **Real-time monitoring** of purifier status  
✅ **SMS notifications** for faults and servicing reminders  
✅ **Secure authentication** via email, password, and phone number (Firebase)  
✅ **Admin dashboard** to manage users and purifiers  
✅ **Database storage** using MongoDB  

---

## 🏗️ System Architecture  
The system consists of three main components:  
1. **Frontend** - Built with Next.js and Tailwind CSS for a seamless UI/UX.  
2. **Backend** - Firebase for authentication and SMS notifications, MongoDB for data storage.  
3. **Notification System** - Sends SMS alerts for purifier issues and servicing.  

---

## 📑 Pages  

### 1️⃣ Authentication Pages  
- **Sign Up Page**  
  - Users can sign up using **email & password** or **phone number (OTP verification via Firebase)**.  
- **Login Page**  
  - Users can log in using their credentials.  
- **Forgot Password Page**  
  - Users can reset their password via email.  

### 2️⃣ Dashboard (Authenticated Users Only)  
- **Overview Page**  
  - Displays the current status of the user's purifier.  
  - Shows upcoming servicing dates and alerts.  
- **Purifier Details Page**  
  - Displays a detailed log of past faults, servicing, and performance metrics.  


### 3️⃣ Admin Pages  
- **Admin Dashboard**  
  - View all purifiers and their status.  
  - Manage users and their assigned purifiers.  
- **SMS Logs Page**  
  - View a history of all sent SMS notifications.  
- **User Management Page**  
  - Add, edit, or remove users.  

---

## 🔔 Notification System  
- Users receive SMS notifications when:  
  - Their purifier has a fault.  
  - A scheduled servicing is due.  
- Admins can configure SMS templates and view sent logs.  

---

## 🛠️ Tech Stack  
| Component       | Technology |  
|----------------|------------|  
| Frontend       | Next.js, Tailwind CSS , Typescript |  
| Backend        | Firebase Authentication, (SMS API) |  
| Database       | MongoDB |  
| State Management | (To be decided) |  

---


## 📌 Conclusion  
This system ensures **clean water and peace of mind** for users by keeping them informed about their purifier’s status. With real-time monitoring, automatic SMS notifications, and an admin dashboard, it streamlines purifier maintenance and improves efficiency. 🚀  

---


## 📌 UI/UX
- [ ] As a user, I want a clean and intuitive interface so that I can easily navigate the system.
- [ ] As a user, I want a dashboard that displays the purifier's status in real time.
- [ ] As a user, I want to receive clear notifications when my purifier needs servicing or has faults.
- [ ] As an admin, I want a mobile-responsive UI to monitor purifiers from any device.

## 🔐 Authentication
### Email & Password Authentication
- [x] As a user, I want to sign up using my email and password to access my account.
- [x] As a user, I want to log in using my email and password.
- [x] As a user, I want to be able to securely logout of my account.
- [x] As a user, I want to reset my password via email if I forget it.
- [x] As an admin, I want to manage users and reset their passwords if needed.

### Phone Number Authentication (Firebase)
- [ ] As a user, I want to sign up using my phone number for added convenience.
- [ ] As a user, I want to receive an OTP via SMS to verify my phone number.
- [ ] As a user, I want to log in using my phone number after verification.

## 🛠️ Purifier Monitoring
- [ ] As a user, I want to see my purifier's status in real time.
- [ ] As a user, I want to receive alerts when my purifier has a fault.
- [ ] As a user, I want to be notified when my purifier needs servicing.
- [ ] As an admin, I want to view the status of all connected purifiers.
- [ ] As an admin, I want to update purifier status manually if necessary.

## 📲 SMS Notifications
- [ ] As a user, I want to receive an SMS notification when my purifier has an issue.
- [ ] As a user, I want to receive an SMS reminder when my purifier needs servicing.
- [ ] As an admin, I want to customize the SMS notification templates.
- [ ] As an admin, I want to see a log of all SMS notifications sent.

## 🛢️ Database (MongoDB)
- [ ] As a  system technician, I want to store user data securely in MongoDB.
- [ ] As a  system technician, I want to store purifier status and history in MongoDB.
- [ ] As a  system technician, I want to log all SMS notifications in MongoDB.
- [ ] As a  system technician, I want to allow admins to update purifier data if needed.

## ⚙️ System Settings & Permissions
- [ ] As an admin, I want to manage user roles (e.g., user, technician, admin).
- [ ] As an admin, I want to set service intervals for each purifier.
- [ ] As an admin, I want to manually trigger SMS notifications if needed.

## 📊 Reports & Analytics
- [ ] As a user, I want to view a history of my purifier's service records.
- [ ] As an admin, I want to generate reports on purifier faults and maintenance.
- [ ] As an admin, I want to track the number of SMS notifications sent per month.

---

