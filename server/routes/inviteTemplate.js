const router = require("express").Router();
const OktaJwtVerifier = require("@okta/jwt-verifier");
let InviteTemplate = require("../models/inviteTemplate.model");


const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: "https://dev-820510.okta.com/oauth2/default",
  clientId: "0oa53fc7pgZWm2jyj4x6",
  assertClaims: {
    aud: "api://default"
  }
});

// Function from example of Okta, used to authenticate
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    return res.status(401).end();
  }

  const accessToken = match[1];
  const expectedAudience = "api://default";

  console.log("authenticationRequired",  req.headers.username);
  return oktaJwtVerifier
    .verifyAccessToken(accessToken, expectedAudience)
    .then(jwt => {
      req.jwt = jwt;
      // console.log(".then");
      // console.log(jwt);
      next();
    })
    .catch(err => {
      res.status(401).send(err.message);
    });
}



router.route("/get/:searchQuery").get( authenticationRequired, (req, res) => {
  let regexBase = req.params.searchQuery.replace(/\s/g, "|");
  regexBase = new RegExp(regexBase, "gi");
  InviteTemplate.find({
    $or: [
      { title: { $regex: regexBase } }, // get byt matching title
      { instructor: { $regex: regexBase } }, // or instructor
      { description: { $regex: regexBase } } // or description
    ],
    $and: [
      { username: req.headers.username }// or description
    ]
  }) // get matching templates from cluster
    .then(inviteTemplate => res.json(inviteTemplate)) // send them as a response
    .catch(err => res.status(400).json("Error: " + err));
});

// all query should have authenticationRequired like here
router.route("/all").get( authenticationRequired, (req, res) => {
  console.log("all user ", req.headers.username)
  InviteTemplate.find({
    $and: [
      { username: req.headers.username }// or description
    ]
  }) // get all templates from cluster
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
