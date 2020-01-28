import mongoose from "mongoose";

export interface CommentModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Document;
    blogId: mongoose.Document;
    comment: string;
}
