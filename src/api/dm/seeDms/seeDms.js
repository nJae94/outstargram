import { prisma } from "../../../../generated/prisma-client";
import { DM_FRAGMENT } from "../../../fragments";

export default {
    Query:{
        seeDms: async(_,__,{request,isAuthenticated}) => {
            isAuthenticated(request);
            const {user} = request;

            return prisma.dms({where: {
                participants_some: {
                    id: user.id
                }
            }
        }).$fragment(DM_FRAGMENT);
        }
    }
}