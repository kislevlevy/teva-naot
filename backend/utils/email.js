import nodemailer from 'nodemailer';
const passwordResetMessage = (token) => ({
  subject: 'Password Reset',
  heading: 'Reset Your Password',
  message:
    'Please click below to reset your password. This link will expire in 10 minutes:',
  html: `
    <div style="text-align: center; margin: 20px 0;">
          <a href="${token}" style="background-color: #64b496; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
            Reset Password
          </a>
        </div>`,
  buttonText: 'Reset Password',
});
const verificationMessage = (token) => ({
  subject: 'Email Verification',
  heading: 'Verify Your Email Address',
  message: 'Please use the following code to verify your email address:',
  html: `
    <div style="text-align: center; margin: 20px 0;">
      <h3 style="color: #333;">${token}</h3> <!-- Verification Code -->
    </div>`,
});

// Email template for email confirmation
const emailConfirmationMessage = (token) => ({
  subject: 'Email Confirmation',
  heading: 'Confirm Your Email Address',
  message: 'Please click below to confirm your email address:',
  html: `
    <div style="text-align: center; margin: 20px 0;">
          <a href="${token}" style="background-color: #64b496; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
            Confirm Email
          </a>
    </div>`,
});
//need to add to env: EMAIL_HOST, EMAIL_USER, EMAIL_PORT, EMAIL_PASSWORD
const sendEmail = async (type, user, token) => {
  let options;
  if (type === 'passwordReset') {
    options = passwordResetMessage(token);
  } else if (type === 'verification') {
    options = verificationMessage(token);
  } else if (type === 'emailConfirmation') {
    options = emailConfirmationMessage(token);
  } else {
    throw new Error('Invalid email type');
  }

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '<info@teva-naot.com> - Teva Naot',
    to: user.email,
    subject: options.subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
        <h2 style="color: #333; text-align: center;">${options.heading}</h2>
        <p style="color: #555; font-size: 16px; text-align: center;">${options.message}</p>
        ${options.html}
        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #555; font-size: 12px;">Teva Naot, Address Line 1, City, State, ZIP</p>
        </div>
      </div>`,
  };

  await transport.sendMail(mailOptions);
};
export default sendEmail;
