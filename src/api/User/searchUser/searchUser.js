import { prisma } from "../../../../generated/prisma-client";

export default {
    //검색할 건데
    Query: {
        searchUser: async(_,args) => prisma.users(
            {
                //조건
                where: {
                    // OR로
                OR: [
                    //이름 혹은 그 밖에 정보가 일치 하는 것 검색
                    {username_contains:args.term},
                    {firstName_contains: args.term},
                    {lastName_contains: args.term}
                ]
            }}
        )
    }

}