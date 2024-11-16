import Users from "../models/userSchema.js";
import { validationResult } from "express-validator";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
export const signInUser = async (req, res) => {
    const errors = validationResult(req);  //validating request body before processing it
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });//return errors array if data-validation fails
    }
    const { email, password, role } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });//If user dont exists 
        }
        // Verifying if the provided password matches the hashed password stored in the database
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Invalid password" });//Error if Invalid password
        }
        if (role !== user.role) {
            return res.status(401).json({ error: "Invalid Role" });//Error if Invalid Role
        }
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        return res.status(200).json({ success: "LogIn Successfull!", accessToken: accessToken });//valid password
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error!" });
    }

}