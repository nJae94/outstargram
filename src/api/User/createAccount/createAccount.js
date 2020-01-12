import {prisma} from "../../../../generated/prisma-client"

export default {
    Mutation: {
        createAccount: async(_,args)=> {
            const {username, email, firstName="", lastName="", bio=""} = args;
            // DB안에 입력된 Email과 username이 같은 값이 있는지 확인
            const exists = await prisma.$exists.user({
                OR: [
                  {
                    username
                  },
                  { email }
                ]
              });

                //있다면 에러
              if (exists) {
                throw Error("동일 uesrname과 email이 있습니다.");
              }

            await prisma.createUser({username,email,firstName,lastName,bio});

            return true;
        }
    }
}