const router = require("express").Router();
let InviteTemplate = require("../models/inviteTemplate.model");

function initTemplate(reqBody) {
  const date = Date.parse(reqBody.date);
  const duration = Number(reqBody.duration);
  const instructor = reqBody.instructor;
  const title = reqBody.title;
  const agenda = reqBody.agenda;
  const description = reqBody.description;
  const willLearn = reqBody.willLearn;
  const mustKnow = reqBody.mustKnow;
  const materials = reqBody.materials;

  return new InviteTemplate({
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
}

router.route("/").get((req, res) => {
  InviteTemplate.find()
    .then(templates => res.json(templates))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/save").post((req, res) => {
  const newTemplate = initTemplate(req.body);
  newTemplate
    .save()
    .then(() =>
      res.json({ message: "Invite template saved!", _id: newTemplate._id })
    )
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
