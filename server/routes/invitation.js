const router = require('express').Router();
const nodemailer = require('nodemailer');
const ical = require('ical-generator');
const InviteTemplate = require('../models/inviteTemplate.model');
const Users = require('../models/users.model');
const baseTools = require('../toolset/base');
const okta = require('../toolset/okta');

router.route('/get/:_id').get(okta.authenticationRequired, (req, res) => {
  // req.params is template's ID
  InviteTemplate.find(req.params)
      .then((templates) => res.json(templates))
      .catch((err) => res.status(400).json('Error: ' + err));
});

const generateIcs = (template) => {
  const startDate = baseTools.transformDate(template.date, template.startTime);
  const endDate = baseTools.transformDate(template.date, template.endTime);

  return ical({
    prodId: {
      company: 'mittrainingplanner-master.herokuapp.com',
      product: 'mi-training-planner',
    },
    name: 'Testfeed',
    timezone: 'Europe/Warsaw',
    events: [
      {
        start: startDate,
        end: endDate,
        timestamp: startDate,
        summary: template.title,
        organizer: `${template.instructor} <mail@example.com>`,
      },
    ],
    method: 'request',
  }).toString();
};

const transport = {
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: `${process.env.GMAIL}`,
    pass: `${process.env.PASS}`,
  },
};

const transporter = nodemailer.createTransport(transport); // Init transporter

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('NODEMAILER: Everything works fine!');
  }
});

router.route('/send').post(okta.authenticationRequired, (req, res) => {
  // req.body => mail details and data for generating .ics file
  const emails = req.body.recipients;
  const subject = req.body.subject;
  const message = req.body.message;
  const template = req.body.template;
  const eventContent = generateIcs(template);

  const mail = {
    from: 'testing',
    to: emails,
    subject: subject,
    html: message,
    icalEvent: {
      filename: 'invitation.ics',
      method: 'request',
      content: eventContent,
    },
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({message: 'failed', sent: false});
    } else {
      res.json({message: 'Message successfully sent!', sent: true});
    }
  });
});

module.exports = router;
