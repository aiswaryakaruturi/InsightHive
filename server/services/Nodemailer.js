const nodemailer = require("nodemailer");

class Nodemailer {
    constructor(survey, surveyTemplate) {
      this.survey = survey;
      this.surveyTemplate = surveyTemplate;
    }
  
    async send() {
      const transporter = nodemailer.createTransport({
      host: "bulk.smtp.mailtrap.io",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "api",
        pass: "39b09c469d44cfe3f0294283840d9f50",
        },
    });

    // const recipientEmails = this.survey.recipients.map(recipient => recipient.email);
    //   console.log('Recipient emails:', recipientEmails.join(', '));
  
      const mailOptions = {
        from: 'no-reply@demomailtrap.com',
        to: this.survey.recipients.map(recipient => recipient.email).join(', '),
        // to: this.recipientEmails.join(', '),
        subject: this.survey.title,
        html: this.surveyTemplate
      };
  
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
      } catch (error) {
        console.error('Error sending email:', error);
        throw error;
      }
    }
  }
  
  module.exports = Nodemailer;
  