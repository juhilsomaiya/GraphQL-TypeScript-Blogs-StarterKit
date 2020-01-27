import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GraphQLUserQueries } from "./user/user.queries";
import { GraphQLUserMutations } from "./user/user.mutations";
import { GraphQLBlogMutations } from "./blog/blog.mutations";
import { GraphQLBlogSubscription } from "./blog/blog.subscriptions";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...GraphQLUserQueries
  }
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    ...GraphQLUserMutations,
    ...GraphQLBlogMutations
  }
});

const RootSubscription = new GraphQLObjectType({
  name: "RootSubscription",
  fields: {
    ...GraphQLBlogSubscription
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubscription
});

export { schema };
