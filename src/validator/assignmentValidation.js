import { body } from "express-validator";
//express validator to validate all the inputs before processing it
const assignmentValidator = [
    //validate task data
    body("task").notEmpty()
        .withMessage("Task is required")
        .isString().withMessage("Task must be string"),
    //validate adminID
    body("adminId").notEmpty()
        .withMessage("AdminId is required")
        .isMongoId()
        .withMessage("Invalid AdminId"),
]
export default assignmentValidator;