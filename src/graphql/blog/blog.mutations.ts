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

const GraphQLCommentBlogMutation = mutationWithClientMutationId({
  name: "commentBlog",
  inputFields: {
    id: { type: GraphQLString },
    comments: { type: GraphQLString }
  },
  outputFields: {
    status: { type: GraphQLString },
    message: { type: GraphQLString },
  },
  mutateAndGetPayload: async ({ id, comments }, ctx: iContext) => {
    const { userId }: any = await ctx.getUserId();

    return await ctx._blogRepository.commentBlog({
      blogId: id,
      userId,
      edits: comments
    });
  }
});


const GraphQLBlogMutations = {
  createBlog: GraphQLCreateBlogMutation,
  commnetBlog: GraphQLCommentBlogMutation
};

export { GraphQLBlogMutations };
