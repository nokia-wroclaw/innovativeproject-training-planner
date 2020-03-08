const router = require("express").Router();
let Template = require("../models/inviteTemplate.model");

router.route("/").get((req, res) => {
  Template.find()
    .then(templates => res.json(templates))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/save").post((req, res) => {
  const date = Date.parse(req.body.date);
  const duration = Number(req.body.duration);
  const instructor = req.body.instructor;
  const title = req.body.title;
  const agenda = req.body.agenda;
  const description = req.body.description;
  const willLearn = req.body.willLearn;
  const mustKnow = req.body.mustKnow;
  const materials = req.body.materials;

  const newTemplate = new inviteTemplate({
    date,
    duration,
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
