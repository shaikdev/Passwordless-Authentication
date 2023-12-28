import { EMAIL } from "../constants/email.constant";
import nodemailer from "nodemailer";

const Mail = (
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  const promise = new Promise((resolve, reject) => {
    // Send Mail
    nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_DOMAIN,
        port: process.env.EMAIL_PORT,
        tls: {
          ciphers: "SSLv3",
        }, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USERNAME, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: `${from || "prisma-node-base"} <shaik@brownbutton.io>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
      };

      if (process.env.NODE_ENV === "test") return;

      // if (process.env.NODE_ENV === "dev") return;

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          reject(false);
          return;
        }
        console.log(info);
        resolve(true);
      });
    });
  });
  return promise;
};

export default Mail;
