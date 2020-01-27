import mongoose from "mongoose";
import { BlogModel } from "./blog.interface";

const blogSchema = new mongoose.Schema(
    {
        userId: mongoose.Types.ObjectId,
        title: String,
        content: String,
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.model<BlogModel>("Blog", blogSchema);
export { Blog };
