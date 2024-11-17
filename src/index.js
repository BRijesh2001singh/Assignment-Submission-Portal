import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./connection/dbConnection.js";
import router from "./routes/routes.js";
import session from 'express-session';
import passport from 'passport';
import "./auth/auth.js";
dotenv.config();
connectDB();//mongo database connection
const app = express();
const PORT = process.env.PORT;
app.use(cors({
    origin: "*",//allowed every domain [for testing only]
    Credential: true
}))

app.use(express.json({ limit: "20kb" }));//json body parser

//oauth2
app.use(
    session({
        secret: 'brijeshbrijesh',
        resave: false,
        saveUninitialized: true,
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.listen(PORT, () => console.log("Server Started at", PORT));
