import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
    
},{timestamps: true})

export const User = mongoose.model("User", UserSchema);