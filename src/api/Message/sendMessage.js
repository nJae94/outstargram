import { prisma } from "../../../generated/prisma-client";
import { DM_FRAGMENT } from "../../fragments";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { dmId, message, toId } = args;
      let dm;
      if (dmId === undefined) {
        if (user.id !== toId) {
            dm = await prisma
            .createDm({
              participants: {
                connect: [{ id: toId }, { id: user.id }]
              }
            })
            .$fragment(DM_FRAGMENT);
        }
      } else {
        dm = await prisma.dm({ id: dmId }).$fragment(DM_FRAGMENT);
      }
      if (!dm) {
        throw Error("Dm을 찾을 수 없습니다.");
      }
      const getTo = dm.participants.filter(
        participant => participant.id !== user.id
      )[0];
      return prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: {
            id: dmId ? getTo.id : toId
          }
        },
        dm: {
          connect: {
            id: dm.id
          }
        }
      });
    }
  }
};