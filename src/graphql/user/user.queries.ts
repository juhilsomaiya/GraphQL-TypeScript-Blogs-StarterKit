import GraphQLUser from "./user.typeDef";
import { iContext } from "../../serverConfig/context";

const GraphQLUserQueries = {
  viewer: {
    type: GraphQLUser,
    resolve: async (info: any, args: any, ctx: iContext) => {
      let userId: any;

      try {
        const uid: any = await ctx.getUserId();
        userId = uid.userId;
      } catch (err) { }

      console.log({ userId });

      if (userId) {
        const user: any = await ctx._userRepository.findUserById(userId);
        return {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
      } else {
        return { id: null };
      }
    }
  }
};

export { GraphQLUserQueries };
