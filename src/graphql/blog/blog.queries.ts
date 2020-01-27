import { GraphQLBoolean } from "graphql";
import { GraphqlBlogConnection } from "./blog.typeDef";
import { connectionArgs } from "graphql-relay";
import { iContext } from "../../serverConfig/context";

const GraphQLBlogQueries = {
  blogs: {
    type: GraphqlBlogConnection,
    args: { ...connectionArgs, completed: { type: GraphQLBoolean } },
    resolve: async (info: any, args: any, ctx: iContext) => {
      const { userId }: any = await ctx.getUserId();
      return ctx._blogRepository.blogsOfUser({ userId }, args);
    }
  }
};

export { GraphQLBlogQueries };
