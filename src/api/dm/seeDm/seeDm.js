import { prisma } from "../../../../generated/prisma-client";
import { DM_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeDm: async(_,args,{request,isAuthenticated}) => {
            isAuthenticated(request);

            const{id} = args;
            const {user}= request;

            const canSee = await prisma.$exists.dm(
                {
                    participants_some: {
                        id: user.id
                    }
                }
            );

            if(canSee)
            {
                return prisma.dm({id}).$fragment(DM_FRAGMENT);
            }
            else
            {
                throw Error("권한없음");
            }
        }
    }
}