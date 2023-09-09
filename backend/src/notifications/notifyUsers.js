const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Your email service and authentication here
});

module.exports.sendEmail = function(email, subject, text) {
  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
