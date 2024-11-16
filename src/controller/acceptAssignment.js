import Assignmets from "../models/assignmentSchema.js";
export const acceptAssignment = async (req, res) => {
    const { id } = req.params;//get the assignment Id from the request url
    const tokenData = req.user;
    const adminId = tokenData.userId;//retrieving adminId from the decoded Token
    try {
        const exisitingAssignment = await Assignmets.findById(id);  //checking if the assignment is present or not
        if (!exisitingAssignment) {
            return res.status(404).json({ error: "Assignment does not exist!" });
        }
        if (exisitingAssignment.adminId != adminId) {  //extra check to ensure that only authorized admin can modify the assignment status
            return res.status(403).json({ error: 'You are not authorized to update this assignment' });
        }
        exisitingAssignment.status = "accepted";//modifying the status
        await exisitingAssignment.save();
        return res.status(200).json({ success: "Assignment Status updated to ACCEPTED." })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "server error!" });
    }
}
