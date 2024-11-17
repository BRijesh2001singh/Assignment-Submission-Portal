import passport from "passport"; // Authentication middleware for Node.js, enables OAuth2 setup
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from 'dotenv';
dotenv.config();
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CLIENT_REDIRECT,
        },
        async (accessToken, refreshToken, profile, done) => {
            // Logs user profile from Google

            //IN REAL APPLICATON SAVE THE DATA INTO PERSISTENT DATABASE 
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => done(null, user));//serializing user data to store in session
passport.deserializeUser((user, done) => done(null, user));//retrieving user data from session