const router = require("express").Router();
let InviteTemplate = require("../models/inviteTemplate.model");


router.route("/").get((req, res) => {
  InviteTemplate.find()
    .then(invitetemplate => res.json(invitetemplate))
    .catch(err => res.status(400).json("Error: " + err));
});


router.route("/save").post((req, res) => {
  const date = req.body.date;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const instructor = req.body.instructor;
  const title = req.body.title;
  const agenda = req.body.agenda;
  const description = req.body.description;
  const willLearn = req.body.willLearn;
  const mustKnow = req.body.mustKnow;
  const materials = req.body.materials;

  const newTemplate = new InviteTemplate({
    date,
    startTime,
    endTime,
    instructor,
    title,
    agenda,
    description,
    willLearn,
    mustKnow,
    materials
  });

  newTemplate
    .save()
    .then(() => res.json("Invite template saved!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
