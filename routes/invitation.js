const router = require("express").Router();
let InviteTemplate = require("../models/inviteTemplate.model");

router.route("/:_id").get((req, res) => {
  console.log(req.params);
  InviteTemplate.find(req.params)
    .then(templates => res.json(templates))
    .catch(err => res.status(400).json("Error: " + err));
});
// router.route("/send").post((req, res) => {});

module.exports = router;
