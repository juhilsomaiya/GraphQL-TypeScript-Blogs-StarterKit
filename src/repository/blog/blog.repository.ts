import { Blog } from "../../schema/blog/blog.model";
import { toObjectId, toBase64, fromBase64 } from "../../common/mongoose";
import _ from "lodash";
import { toGlobalId } from "graphql-relay";
import { GLOBAL_ID_TYPES } from "../../graphql/globalIdTypes";
import pubSub from "../../graphql/publisher";
import { BLOG_SUBSCRIPTION_TRIGGERS } from "../../common/constants/subscriptions";

class BlogRepository {
  private static instance: BlogRepository;

  async blogsOfUser(
    { userId }: { userId: any },
    {
      first,
      after
    }: { first: number; after: string }
  ) {

    let where: any = { userId: toObjectId(userId) };
    if (after) {
      where["_id"] = { $lt: toObjectId(fromBase64(after)) };
    }

    const blogs = await Blog.find({ ...where })
      .sort({
        _id: -1
      })
      .limit(first);

    const firstEdge: any = _.head(blogs);
    const lastEdge: any = _.last(blogs);

    const [previousCount, nextCount] = await Promise.all([
      firstEdge ? Blog.count({ ...where, _id: { $gt: firstEdge._id } }) : 0,
      lastEdge ? Blog.count({ ...where, _id: { $lt: lastEdge._id } }) : 0
    ]);

    const edges = blogs.map(blog => ({
      cursor: toBase64(`${blog._id}`),
      node: blog
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage: nextCount > 0,
        hasPreviousPage: previousCount > 0,
        startCursor: firstEdge ? toBase64(`${firstEdge._id}`) : null,
        endCursor: lastEdge ? toBase64(`${lastEdge._id}`) : null
      }
    };
  }

  async createBlog({ title, content, userId }: { title: string; content: string, userId: string }) {
    const blog = new Blog({
      title,
      content,
      userId: toObjectId(userId),
      completed: false
    });

    await blog.save();

    const blogEdge = {
      cursor: toBase64(`${blog._id}`),
      node: blog
    };

    pubSub.publish(
      `${BLOG_SUBSCRIPTION_TRIGGERS.BLOG_CREATED}_${toGlobalId(
        GLOBAL_ID_TYPES.User,
        userId
      )}`,
      { blogEdge }
    );

    return {
      status: "SUCCESS",
      message: "blog created successfully!",
      blogEdge
    };
  }

  public static getInstance(): BlogRepository {
    if (!BlogRepository.instance) {
      BlogRepository.instance = new BlogRepository();
    }
    return BlogRepository.instance;
  }
}

export { BlogRepository };
