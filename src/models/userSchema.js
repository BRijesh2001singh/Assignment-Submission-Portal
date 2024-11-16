import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Enter a valid email address'], //database side validation of email using regex //{Maybe not required we are going to use express validator late}
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],//to identify whether the user is admin or not
        default: "user",
    },
    registeredAt: {
        type: Date,
        default: Date.now()
    }
})
userSchema.pre('save', async function (next) {   //before saving any documents this function will run to hash the password 
    try {
        const salt = await bcryptjs.genSalt(10);
        //hashing the password using generated salt
        this.password = await bcryptjs.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})
export default mongoose.model("Users", userSchema);
