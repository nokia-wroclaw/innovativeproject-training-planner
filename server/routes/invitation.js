const router = require("express").Router();
const nodemailer = require("nodemailer");
const ical = require("ical-generator");
let InviteTemplate = require("../models/inviteTemplate.model");

router.route("/:_id").get((req, res) => {
  // req.params = template's ID
  InviteTemplate.find(req.params) // find in the DB cluster a template with matching ID
    .then(templates => res.json(templates)) // then send it as a response
    .catch(err => res.status(400).json("Error: " + err));
});

// Joins date and time strings and inits a new date object.
const transformDate = (dateStr, timeStr) => {
  let datetime = dateStr + " " + timeStr;
  datetime = new Date(datetime);
  return datetime;
};

// Generates contents for invitation.ics file
const generateIcs = template => {
  const startDate = transformDate(template.date, template.startTime);
  const endDate = transformDate(template.date, template.endTime);

  return ical({
    prodId: {
      company: "mittrainingplanner-master.herokuapp.com",
      product: "mi-training-planner"
    },
    name: "Testfeed",
    timezone: "Europe/Warsaw",
    events: [
      {
        start: startDate,
        end: endDate,
        timestamp: startDate,
        summary: template.title,
        organizer: `${template.instructor} <mail@example.com>`
      }
    ],
    method: "request"
  }).toString();
};

// Nodemialers transport data
const transport = {
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: `${process.env.MAIL}`,
    pass: `${process.env.PASS}`
  }
};

const transporter = nodemailer.createTransport(transport); // Init transporter

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("NODEMAILER: Everything works fine!");
  }
});

router.route("/send").post((req, res) => {
  // req.body = mail details and data for generating .ics file
  const emails = req.body.recipients;
  const subject = req.body.subject;
  const message = req.body.message;
  const template = req.body.template;
  const eventContent = generateIcs(template);

  let mail = {
    from: "testing",
    to: emails,
    subject: subject,
    html: message,
    icalEvent: {
      filename: "invitation.ics",
      method: "request",
      content: eventContent
    }
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json("failed :(");
    } else {
      res.json("Message successfully sent!");
    }
  });
});

module.exports = router;
