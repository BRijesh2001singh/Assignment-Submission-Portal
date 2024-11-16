import { validationResult } from "express-validator";
import Assignments from "../models/assignmentSchema.js";
import Users from "../models/userSchema.js";
export const uploadAssignment = async (req, res) => {
    const errors = validationResult(req); //validating request body before processing it
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const tokenData = req.user;
    const userId = tokenData.userId;  //retrieving userId from Token
    const { task, adminId } = req.body;
    //verifying if userId already exists or not, and if User exists verify whether the role === user 
    try {
        const existingUser = await Users.findOne({
            _id: userId,
            role: "user"
        })
        if (!existingUser) {
            return res.status(404).json({ error: "User Not found!" });
        }
        //verifying if adminId already exists or not and if it exists verify whether the role === admin
        const existingAdmin = await Users.findOne({
            _id: adminId,
            role: "admin"
        })
        if (!existingAdmin) {
            return res.status(404).json({ error: "Admin Not found!" });
        }
        const newAssignment = new Assignments({  //creating a new assignment
            userId: userId,
            task: task,
            adminId: adminId
        })
        await newAssignment.save();//saving new assignment
        // Populating the userId and adminId with their names after saving
        const populatedAssignment = await Assignments.findById(newAssignment._id)
            .populate('userId', 'name -_id')  // Populate user name
            .populate('adminId', 'name -_id');  // Populate the admin name
        return res.status(200).json({ success: "Assignment uploaded", assignment: populatedAssignment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error!" });
    }

}