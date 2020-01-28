import { GraphqlBlogConnection } from "./blog.typeDef";
import { connectionArgs } from "graphql-relay";
import { iContext } from "../../serverConfig/context";
import { GraphqlCommentConnection } from "../comments/comment.typeDef";
import { GraphQLString } from "graphql";

const GraphQLBlogQueries = {
  blogs: {
    type: GraphqlBlogConnection,
    args: { ...connectionArgs },
    resolve: async (info: any, args: any, ctx: iContext) => {
      const { userId }: any = await ctx.getUserId();
      return ctx._blogRepository.blogsOfUser({ userId }, args);
    }
  },
  comment: {
    type: GraphqlCommentConnection,
    args: {
      blogId: { type: GraphQLString },
      ...connectionArgs
    }
    , resolve: async (info: any, args: any, ctx: iContext) => {
      const data = await ctx._blogRepository.commentsOfBlogs(args.blogId);
      return data;
    }
  }
};

export { GraphQLBlogQueries };
