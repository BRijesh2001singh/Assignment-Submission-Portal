import Users from "../models/userSchema.js";
import Assignments from "../models/assignmentSchema.js";
export const getAssignment = async (req, res) => {
    const tokenData = req.user;
    const id = tokenData.userId; /*retrieving adminId from the decoded Token so 
    that only logged in admin can check the assignments submitted to that them*/
    const isAdmin = await Users.findById(id);
    if (!isAdmin) {//check if user exists
        return res.status(404).json({ error: "Admin not found!" });
    }
    if (isAdmin.role !== "admin") {//verify if role === admin 
        return res.status(401).json({ error: "User unauthorized." });
    }
    const assignmentsList = await Assignments.find({ adminId: id }).populate('userId', 'name').populate('adminId', 'name');
    /*populate user and admin name based on their IDs*/
    if (!assignmentsList || assignmentsList.length === 0) {
        return res.status(404).json({ error: "No Assignments found." });
    }
    return res.status(200).json({ assignmentsList: assignmentsList });
}