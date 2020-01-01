import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async(_,args) => {

            const {email, secret} = args;
            const user = await prisma.user({email});
            //로그인이 되면
            if(user.loginSecret === secret){
                //로그인 확인 문자 초기화
                await prisma.updateUser({
                where:{id: user.id},
                  data:{
                      loginSecret: ""
                      }
                });
                //JWT 토큰 생성
                return generateToken(user.id);          
            }
            else{
                throw Error("login password incorrect");
            }
        }
    }
}