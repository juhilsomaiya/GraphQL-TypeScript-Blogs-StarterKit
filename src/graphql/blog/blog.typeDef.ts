import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} from "graphql";
import { toGlobalId, connectionDefinitions } from "graphql-relay";
import { GLOBAL_ID_TYPES } from "../globalIdTypes";

export const GraphqlBlog = new GraphQLObjectType({
    name: "Blog",
    fields: () => ({
        id: {
            type: GraphQLID,
            resolve: ({ _id }) => {
                return toGlobalId(GLOBAL_ID_TYPES.Blog, _id);
            }
        },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
    })
});

const {
    connectionType: GraphqlBlogConnection,
    edgeType: BlogEdgeType
} = connectionDefinitions({ nodeType: GraphqlBlog });

export { GraphqlBlogConnection, BlogEdgeType };
