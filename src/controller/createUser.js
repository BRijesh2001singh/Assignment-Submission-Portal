import Users from "../models/userSchema.js";
import { validationResult } from "express-validator";
export const createUser = async (req, res) => {
    const errors = validationResult(req); //validating request body before processing it
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })//return errors array if data-validation fails
    }
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists!" });//if user already exists
        }
        const newUser = new Users({ name, email, password, role });
        await newUser.save();
        newUser.password = "";//removing the password hash before returning user-data in response
        return res.status(200).json({ success: "User Registered." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error!" });
    }
}
