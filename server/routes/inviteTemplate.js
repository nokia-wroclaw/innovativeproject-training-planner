const router = require("express").Router();
let InviteTemplate = require("../models/inviteTemplate.model");

router.route("/get/:searchQuery").get((req, res) => {
  let regexBase = req.params.searchQuery.replace(/\s/g, "|");
  regexBase = new RegExp(regexBase, "gi");
  InviteTemplate.find({
    $or: [
      { title: { $regex: regexBase } }, // get byt matching title
      { instructor: { $regex: regexBase } }, // or instructor
      { description: { $regex: regexBase } } // or description
    ]
  }) // get matching templates from cluster
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
  const trainingType = req.body.trainingType;
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
    trainingType,
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

router.route("/delete/:_id").post((req, res) => {
  // req.params = template's ID
  InviteTemplate.remove(req.params)
    .then(() => res.json("Invite template deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
