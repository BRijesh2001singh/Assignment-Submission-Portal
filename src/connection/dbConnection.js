import mongoose from "mongoose";
//connecting mongo db server
export const connectDB = async () => {
    const mongo_uri = process.env.DB_URL;//replace with mongo URI
    try {
        await mongoose.connect(mongo_uri);
        console.log("Mongo Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
