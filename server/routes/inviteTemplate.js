const router = require("express").Router();
let InviteTemplate = require("../models/inviteTemplate.model");

router.route("/get/:searchQuery").get((req, res) => {
  let regexBase = req.params.searchQuery.replace(/\s/g, "|");
  regexBase = new RegExp(regexBase, "gi");
  InviteTemplate.find({ title: { $regex: regexBase } }) // get matching templates from cluster
    .then(inviteTemplate => res.json(inviteTemplate)) // send them as a response
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/all").get((req, res) => {
  InviteTemplate.find() // get all templates from cluster
    .then(inviteTemplate => res.json(inviteTemplate)) // send them as a response
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/save").post((req, res) => {
  // req.body is a template as JSON
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
    .save() // Save to DB
    .then(() => res.json("Invite template saved!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
