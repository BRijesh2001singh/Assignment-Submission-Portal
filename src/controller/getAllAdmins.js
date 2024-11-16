import Users from "../models/userSchema.js";
export const getAllAdmins = async (req, res) => {
    try {
        const adminList = await Users.find({ role: "admin" }).select("-password"); //removing hashed password field from adminList
        if (!adminList) {
            return res.status(404).json({ error: "No admins found!" });
        }
        return res.status(200).json({ adminList: adminList });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "server error!" });
    }
}