import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} from "graphql";
import { toGlobalId, connectionDefinitions } from "graphql-relay";
import { GLOBAL_ID_TYPES } from "../globalIdTypes";

export const GraphqlComment = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        id: {
            type: GraphQLID,
            resolve: ({ _id }) => {
                return toGlobalId(GLOBAL_ID_TYPES.Comment, _id);
            }
        },
        comment: { type: GraphQLString }
    })
});

const {
    connectionType: GraphqlCommentConnection,
    edgeType: CommentEdgeType
} = connectionDefinitions({ nodeType: GraphqlComment });

export { GraphqlCommentConnection, CommentEdgeType };
