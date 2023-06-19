const nodemailer = require("nodemailer");
const config = require("../config");
var fs = require("fs");
var path = require("path");
const Handlebars =  require("handlebars");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.sender,
    pass: config.email.pass,
  },
});

const MailService = (data) => {
  // Add example for sending mail from sendgrid
  const filePath = path.join(__dirname, "../emails/message.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = Handlebars.compile(source);
  var htmlToSend = template(data);

  const msg = {
    from: config.email.sender,
    to: 'smeetmak@gmail.com',
    subject: "New Message",
    text: "New Message Recieved",
    html: htmlToSend,
  };
  mailTransporter
    .sendMail(msg)
    .then(() => {
      return { delivered: 1, status: "ok" };
    })
    .catch((error) => {
      console.log(error, 'mail not sent')
      return { delivered: 0, status: "ok" };
    });
};

module.exports = MailService;