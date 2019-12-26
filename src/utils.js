import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

//비밀번호로 사용될 단어 조합을 만드는 함수
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

// 비밀번호 이메일 보낼 함수
const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

// 받을 이멜 주소와 비밀번호를 매개변수로 받음
export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "test@gmail.com",
    to: adress,
    subject: "🔒Login Secret for outstargram🔒",
    html: `Hello! Your login secret it ${secret}.<br/>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};