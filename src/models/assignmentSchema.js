import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", //refrence to users collection where role = user
        required: true
    },
    task: {
        type: String,
        required: true,
        trim: true   //remove any extra space after or before the string
    },
    adminId: {  //TODO ::: Try using adminEmail instead of adminID :::
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",//reference to users collection where role = admin
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "rejected", "accepted"],  //status can have only these three values
        default: "pending",
    },
    submittedAt: {
        type: Date,
        default: Date.now(),
    }
})
export default mongoose.model("Assignments", assignmentSchema);