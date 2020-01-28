import mongoose from "mongoose";

export interface BlogModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Document;
    title: string;
    content: string;
}
