const router = require("express").Router();
const nodemailer = require("nodemailer");
const ical = require("ical-generator");
let InviteTemplate = require("../models/inviteTemplate.model");

router.route("/:_id").get((req, res) => {
  console.log(req.params);
  InviteTemplate.find(req.params)
    .then(templates => res.json(templates))
    .catch(err => res.status(400).json("Error: " + err));
});

const transformDate = (dateStr, timeStr) => {
  let datetime = dateStr + " " + timeStr;
  datetime = new Date(datetime);
  // datetimeStr = datetimeStr.toISOString().replace(/[^0-9T]/gi, "");
  return datetime;
};

const generateIcs = eventTemp => {
  const startDate = transformDate(eventTemp.date, eventTemp.startTime);
  const endDate = transformDate(eventTemp.date, eventTemp.endTime);

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
        summary: eventTemp.title,
        organizer: `${eventTemp.instructor} <mail@example.com>`
      }
    ]
  }).toString();
};

const transport = {
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: `${process.env.MAIL}`,
    pass: `${process.env.PASS}`
  }
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("NODEMAILER: Everything works fine!");
  }
});

router.route("/send").post((req, res) => {
  const emails = req.body.recipents;
  const subject = req.body.subject;
  const message = req.body.message;
  const eventTemp = req.body.eventTemp;
  const eventContent = generateIcs(eventTemp);

  let mail = {
    from: "testing",
    to: emails,
    subject: subject,
    text: message,
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
      res.json("Message successfully send!");
    }
  });
});

module.exports = router;
