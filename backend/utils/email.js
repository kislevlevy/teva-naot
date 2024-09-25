import nodemailer from 'nodemailer';

const passwordResetMessage = (token) => ({
  subject: 'איפוס סיסמה',
  heading: 'אפס את הסיסמה שלך',
  message:
    'אנא לחץ על הקישור למטה כדי לאפס את הסיסמה שלך. קישור זה יפוג בעוד 10 דקות',
  html: `
    <div style="text-align: center; margin: 20px 0;">
          <a href="${token}" style="background-color: #64b496; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
            איפוס סיסמה
          </a>
    </div>`,
  buttonText: 'איפוס סיסמה',
});

const verificationMessage = (token) => ({
  subject: 'אימות דוא"ל',
  heading: 'אמת את כתובת הדוא"ל שלך',
  message: 'אנא השתמש בקוד הבא כדי לאמת את כתובת הדוא"ל שלך:',
  html: `
    <div style="text-align: center; margin: 20px 0;">
      <h3 style="color: #333;">${token}</h3> <!-- קוד אימות -->
    </div>`,
});

// Email template for email confirmation
const emailConfirmationMessage = (token) => ({
  subject: 'אישור דוא"ל',
  heading: 'אשר את כתובת הדוא"ל שלך',
  message: 'אנא לחץ על הקישור למטה כדי לאשר את כתובת הדוא"ל שלך:',
  html: `
    <div style="text-align: center; margin: 20px 0;">
          <a href="${token}" style="background-color: #64b496; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
            אישור דוא"ל
          </a>
    </div>`,
});

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
    secure: true,
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: options.subject,
    html: `
    <!DOCTYPE html>
    <html lang="he">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Teva Naot</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;300;600;800&display=swap" rel="stylesheet">
        <style>
            body {
                margin: 0;
            }
            body * {
                font-family: "Open Sans", sans-serif;

            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #e0e0e0;
                direction: rtl;
            }
            .header {
                text-align: center;
            }
            .header img {
                width: 150px;
            }
            .heading {
                color: #333;
                margin-top: 20px;
                text-align: center;
            }
            .message {
                color: #555;
                font-size: 16px;
                text-align: center;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                color: #555;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://res.cloudinary.com/drxtaxnkr/image/upload/v1727174940/logoMain_jupmbk.png" alt="Teva Naot">
            </div>
            <h2 class="heading">
                ${options.heading}
            </h2>
            <p class="message">
                ${options.message}
            </p>
            ${options.html}
            <div class="footer">
                <p>
                    טבע נאות, נווה צדק 1, תל-אביב, 100890
                </p>
            </div>
        </div>
    </body>
    </html>`,
  };

  await transport.sendMail(mailOptions);
};
export default sendEmail;
