import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      // 유저 아이디에 해당되는 posts정보를 가져옴
      const posts = await prisma.user({ id: user.id }).posts();
      return {
        user: userProfile,
        posts
      };
    }
  },
  //parent는 User를 호출 하는 상위 resolver 여기선 user
  User: {
    fullName: parent => {
      // parent에서 id에 해당하는 user정보를 가져오니까 그 중 firstName과 lastName을 합쳐서 반환
      return `${parent.firstName} ${parent.lastName}`;
    }
  }
};