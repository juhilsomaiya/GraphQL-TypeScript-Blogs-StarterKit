import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from "graphql";
import { toGlobalId } from "graphql-relay";
import { GLOBAL_ID_TYPES } from "../globalIdTypes";
import { GraphQLBlogQueries } from "../blog/blog.queries";


const GraphQLUser = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: ({ _id, id }) => {
        return toGlobalId(GLOBAL_ID_TYPES.User, id ? id : _id);
      }
    },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    blogs: GraphQLBlogQueries.blogs,
    comment: GraphQLBlogQueries.comment
  })
});

export default GraphQLUser;
