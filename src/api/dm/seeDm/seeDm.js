import { prisma } from "../../../../generated/prisma-client";
import { DM_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeDm: async(_,args,{request,isAuthenticated}) => {
            isAuthenticated(request);

            const{id} = args;
            const {user}= request;

            //Dm 채팅방이 존재하는지 검사
            const canSee = await prisma.$exists.dm(
                {
                    participants_some: {
                        id: user.id
                    }
                }
            );
            //존재하면
            if(canSee)
            {
                // 해당 ID값을 통해 DM_FRAGMENT를 검색
                return prisma.dm({id}).$fragment(DM_FRAGMENT);
            }
            else
            {
                throw Error("권한없음");
            }
        }
    }
}