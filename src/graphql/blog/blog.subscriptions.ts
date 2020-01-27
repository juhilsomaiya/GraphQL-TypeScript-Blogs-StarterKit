import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { BlogEdgeType } from "./blog.typeDef";
import pubSub from "../publisher";
import { BLOG_SUBSCRIPTION_TRIGGERS } from "../../common/constants/subscriptions";

const GraphQLBlogSubscription = {
  blogCreated: {
    args: { viewerId: { type: GraphQLString } },
    type: new GraphQLObjectType({
      name: "blogCreated",
      fields: () => ({
        blogEdge: { type: BlogEdgeType }
      })
    }),
    resolve: (info: any) => info,
    subscribe: (info: any, { viewerId }: any) => {
      return pubSub.asyncIterator(
        `${BLOG_SUBSCRIPTION_TRIGGERS.BLOG_CREATED}_${viewerId}`
      );
    }
  },
};

export { GraphQLBlogSubscription };
