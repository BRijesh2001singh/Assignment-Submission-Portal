import { Router } from "express";
import { signInUser } from "../controller/signIn.js";
import { createUser } from "../controller/createUser.js";
import signUpValidator from "../validator/signUpValidation.js";  //validator for user signUp inputs
import signInValidator from "../validator/signInValidation.js"; //validator for user signIN inputs
import assignmentValidator from "../validator/assignmentValidation.js";  //validator for inputs uploading assignments
import { uploadAssignment } from "../controller/uploadAssignment.js";
import { getAllAdmins } from "../controller/getAllAdmins.js";
import { acceptAssignment } from "../controller/acceptAssignment.js";
import { rejectAssignment } from "../controller/rejectAssignment.js";
import { tokenVerification } from "../middleware/tokenVerification.js";
import { getAssignment } from "../controller/getAssignments.js";
const router = Router();
router.post("/register", signUpValidator, createUser); //route for registering USER
router.post("/login", signInValidator, signInUser);//route for user sign-IN
router.post("/upload", assignmentValidator, tokenVerification, uploadAssignment);//route for uploading assignments
router.get("/admins", getAllAdmins); //route for retrieving all
router.get("/assignments", tokenVerification, getAssignment);
router.post("/assignments/:id/accept", tokenVerification, acceptAssignment);//route for accepting assignments
router.post("/assignments/:id/reject", tokenVerification, rejectAssignment);//route for rejecting assignments

export default router;