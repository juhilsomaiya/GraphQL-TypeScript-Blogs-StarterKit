import mongoose from "mongoose";
import { CommentModel } from "./comment.interface";

const commentSchema = new mongoose.Schema(
    {
        userId: mongoose.Types.ObjectId,
        blogId: mongoose.Types.ObjectId,
        comment: String,
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model<CommentModel>("Comment", commentSchema);
export { Comment };
