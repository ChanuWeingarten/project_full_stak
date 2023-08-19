const nodemailer = require('nodemailer');

async function sendEmail(body) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'c0583260972@gmail.com',
      pass: 'Ww5869343!'
    }
  });
  
  var mailOptions = {
      from: 'c0583260972@gmail.com',
      to: `${body.address}`,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    }
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
}

module.exports = {
  sendEmail
}

