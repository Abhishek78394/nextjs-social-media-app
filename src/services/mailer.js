import nodemailer from 'nodemailer';
import User from "@/models/user";


export const sendEmail = async({toEmail, mailSubject, locale}) => {
    try {

      const transporter = nodemailer.createTransport({
        service: "gmail", 
        host: "smtp.gmail.com",
        port: 587, 
        auth: {
          user: "abhi78394@gmail.com",
          pass: "qxalfkdcdtfcutws" 
        }
      });
      let mailOptions = {
        from: '"aj 👻" <abhi78394@gmail.com>',
        to: toEmail,
        subject: mailSubject,
        html:  `<p>${locale.otpNumber}</p>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`)
        return true;
    } catch (error) {
        console.log("Error:++ ", error);
    }
}