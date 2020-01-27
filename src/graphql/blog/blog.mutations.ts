import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString } from "graphql";
import { iContext } from "../../serverConfig/context";
import { BlogEdgeType } from "./blog.typeDef";

const GraphQLCreateBlogMutation = mutationWithClientMutationId({
  name: "createBlog",
  inputFields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString }
  },
  outputFields: {
    status: { type: GraphQLString },
    message: { type: GraphQLString },
    blogEdge: { type: BlogEdgeType }
  },
  mutateAndGetPayload: async ({ title, content }, ctx: iContext) => {
    const { userId }: any = await ctx.getUserId();
    return await ctx._blogRepository.createBlog({ title, content, userId });
  }
});

const GraphQLBlogMutations = {
  createBlog: GraphQLCreateBlogMutation
};

export { GraphQLBlogMutations };
