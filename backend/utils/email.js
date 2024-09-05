import nodemailer from "nodemailer";

//need to add to env: EMAIL_HOST, EMAIL_USER, EMAIL_PORT, EMAIL_PASSWORD
const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
