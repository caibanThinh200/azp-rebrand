import Mailjet from "node-mailjet";

export const mailjet = new Mailjet({
  apiKey: process.env.NEXT_PUBLIC_MAILJET_API_KEY,
  apiSecret: process.env.NEXT_PUBLIC_MAILJET_SECRET_KEY,
});
