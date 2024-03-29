const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const keys = require('../config/keys');

// const mailerSend = new MailerSend({
//     apiKey: keys.emailerApiKey,
//   });
  
// const sentFrom = new Sender("no-reply@emaily.com", "Rakesh");

class Emailer {
    // constructor({ subject, recipients }, content) {
    //     this.sgApi = keys.emailerApiKey;
    //     this.from = 'no-reply@emaily.com';
    //     this.subject = subject;
    //     this.content = content;
    //     this.recipients = Array.isArray(recipients) ? recipients : [];
    //     this.emailParams = new EmailParams();
    //     this.formatAddresses();
    //     this.addRecipients();
    // }

    formatAddresses(emailString, delimiter = ',') {
        const emailRegExp = /[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,}/g;
        const recipientEmails = [];
        let match;
        while ((match = emailRegExp.exec(emailString)) !== null) {
            recipientEmails.push(match[0]);
        }
        this.recipients = recipientEmails.map(email => new Recipient(email));
    }

    // addClickTracking(emailParams) {
    //     emailParams.setTrackClicks(true);
    // }

    addRecipients() {
        const recipientEmails = this.recipients.map(recipient => recipient.email);
        this.emailParams.setTo(recipientEmails);
    }

    async send() {
        const emailParams = new EmailParams()
            .setFrom("no-reply@emaily.com")
            .setSubject(this.subject)
            .setHtml(this.content.html || '')
            .setText(this.content.text || '');

        this.addRecipients(emailParams);
        // this.addClickTracking(emailParams);

        try {
            const mailerSend = new MailerSend({ api_key: this.sgApi });
            const response = await mailerSend.email.send(emailParams);
            return response;
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}

module.exports = Emailer;
