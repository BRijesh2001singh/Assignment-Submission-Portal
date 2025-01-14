# Assignment Submission Portal API

This is a backend API for an **Assignment Submission Portal**, where **users** can upload assignments, and **admins** can accept or reject them. The project is built with **Node.js**, **Express.js**, and **MongoDB**.All Inputs are validated using **Express-validator** , Authentication is handled using **JWT (JSON Web Tokens)** also implement oAUTH2 google .

## Features

- **Users** can:
  - Register and log in.
  - Upload assignments.
  
- **Admins** can:
  - Register and log in.
  - View assignments tagged to them.
  - Accept or reject assignments.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- ESM (ECMAScript Modules)

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (or use a hosted MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone git@github.com:BRijesh2001singh/Assignment-Submission-Portal.git
```

# Install Dependencies
Navigate to the project directory and install the required dependencies:

```bash
npm install
```
# Set Up Environment Variables
```bash
JWT_SECRET=your-secret-key

MONGO_URI=your-mongodb-uri

PORT=3000

// GOOGLE PROVIDER

GOOGLE_CLIENT_ID=your-google-client-id  //get the client id from google cloud console
GOOGLE_CLIENT_SECRET=your-client-secret    //get the client secret from google cloud console
GOOGLE_CLIENT_REDIRECT="http://localhost:3000/api/auth/google/redirect"   //setup redirect route after successfull login

```
# Running the Application
After installing all the dependencies. Run the following command.
```bash
npm run dev
```

# Testing with Postman/ThunderClient

Endpoints:

 1. POST /api/Register -Register a new user.
 Request Body:
 ```bash
{
"name":"demoname",
"email":"demo@gmail.com",
"password":"demo123",
"role":"admin | user"  //role can either be admin or user
}
 ```
2. POST /api/login -User login.
 Request Body:
 ```bash
{
"email":"demo@gmail.com",
"password":"demo123",
"role":"admin | user"  //role can either be admin or user

// NOTE:Save the token that will be returned as response on successfull login.It will be used for accessing protected Routes.
}
 ```
3. POST /api/upload -Upload an assignment.
 Request Body:
 ```bash
{
"adminId":  //enter admin id
"task":  //enter assignment details
}
 ```
Request Header:
```bash
Authorizaton : (add the token that will be provided on login,ONLY USERS TOKEN IS AUTHORIZED)

//for verification of user and retrieving userID
```

4. GET /api/assignments  -View assignments tagged to the admin

Request Header:
```bash
Authorizaton : (add the token that will be provided on login, ONLY ADMIN TOKEN IS AUTHORIZED)

//for verification of admin and retrieving adminID
```

5. GET /api/admins  -View all admins


6. POST /api/assignments/:id/accept  - Accept an assignment.
Request Parameter:
```bash
id - Assignment Id
```
Request Header:
```bash
Authorizaton : (add the token that will be provided on login,ONLY ADMIN TOKEN IS AUTHORIZED)

//for verification of admin and retrieving adminID
```

7. POST /api/assignments/:id/reject  - Reject an assignment.

Request Parameter:
```bash
id - Assignment Id
```
Request Header:
```bash
Authorizaton : (add the token that will be provided on login,ONLY ADMIN TOKEN IS AUTHORIZED)

//for verification of admin and retrieving adminID
```

# OAuth2 endpoints [Optional functionality] 
IMPORTANT : Test these routes on browser ONLY.
1. GET /auth/google   route for google login page
  example: http://localhost:3000/api/auth/google

# Validation
Used express-validator middleware to validate all inputs.

# Dependencies

List of dependencies:
```bash
    "bcryptjs": "^2.4.3",
     "cors": "^2.8.5",
     "dotenv": "^16.4.5",
     "express": "^4.21.1",
     "express-session": "^1.18.1",
     "express-validator": "^7.2.0", 
     "jsonwebtoken": "^9.0.2",
     "mongoose": "^8.8.1",
     "nodemon": "^3.1.7",
     "passport": "^0.7.0",
     "passport-google-oauth20": "^2.0.0"
```

# Additional Notes
Make sure your MongoDB server is running, or if you're using MongoDB Atlas, your connection string is correct.

Example :

If your API endpoint is http://localhost:3000/api/assignments, you

 can test it in Postman / ThunderClient like this:

Method: GET

URL: http://localhost:3000/api/assignments

Headers: If your API requires authentication (e.g., JWT):

Authorization: <your-jwt-token>

// the jwt token for each user can be retrieved by successfully logging in using the http://localhost:3000/api/login route.


```bash
This README covers all the basics you need to set up, run, and use the backend API for assignment submission portal.
```