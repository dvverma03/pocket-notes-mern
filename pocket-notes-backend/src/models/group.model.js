import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const groupSchema = new Schema({
    groupName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    groupIcon: {
        type: String,
        required: [true, "Password is required"]
    },
    groupColor: {
        type: String,
        required: true,
    },
    groupMessage: {
        type: [Schema.Types.ObjectId],
        ref: "Message",
        default: [],
    }
}, { timestamps: true })

export const Group = mongoose.model("Groups", groupSchema)