import { body } from "express-validator";
//validating user inputs using express validator
const signInValidator = [
    //email validation
    body("email").notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid Email"),
    //password validation
    body("password").notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password length must be at least 6 characters"),

    //role validation
    body("role").notEmpty()
        .withMessage("Role is required")
        .isIn(["admin", "user"])
        .withMessage("Role must be either 'admin' or 'user'"),
]

export default signInValidator;