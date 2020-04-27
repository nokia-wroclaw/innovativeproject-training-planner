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
  const template = req.body;
  const newTemplate = new InviteTemplate(template);

  newTemplate
    .save() // Save to DB
    .then(() => res.json("Invite template saved!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  const template = req.body;
  InviteTemplate.updateOne({ _id: req.params.id }, template) // Save to DB
    .then(() => res.json("Invite template updated."));
});

router.route("/delete/:_id").post((req, res) => {
  // req.params = template's ID
  InviteTemplate.deleteOne(req.params)
    .then(() => res.json("Invite template deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
