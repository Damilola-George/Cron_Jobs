// File: emailSender.js
const nodemailer = require('nodemailer');

async function sendBirthdayEmail(user) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS  // Your Gmail password or app-specific password
    },
  });

  let mailOptions = {
    from: 'your-email@gmail.com',
    to: user.email,
    subject: 'Happy Birthday!',
    text: `Dear ${user.username},\n\nWishing you a wonderful birthday!\n\nBest regards,\nYour Company`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendBirthdayEmail;
