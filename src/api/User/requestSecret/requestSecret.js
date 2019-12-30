//비밀번호 요청

import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      console.log(request);
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await sendSecretMail(email,loginSecret);
          // 비밀번호가 만들어지면 해당 이메일에 업데이트
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch {
        return false;
      }
    }
  }
};