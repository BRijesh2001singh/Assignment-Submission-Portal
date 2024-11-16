import { body } from "express-validator";
//validating user inputs using express validator
const signUpValidator = [
    //name validation
    body("name").notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters long"),
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

export default signUpValidator;