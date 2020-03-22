const router = require("express").Router();
const nodemailer = require("nodemailer");
let InviteTemplate = require("../models/inviteTemplate.model");

router.route("/:_id").get((req, res) => {
  console.log(req.params);
  InviteTemplate.find(req.params)
    .then(templates => res.json(templates))
    .catch(err => res.status(400).json("Error: " + err));
});

let transport = {
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: `${process.env.MAIL}`,
    pass: `${process.env.PASS}`
  }
};

let transporter = nodemailer.createTransport(transport);

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

  let mail = {
    from: "testing",
    to: emails,
    subject: subject,
    text: message
  };
  console.log(mail);
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json("failed :(");
    } else {
      res.json("Message successfully send!");
    }
  });
});

module.exports = router;
