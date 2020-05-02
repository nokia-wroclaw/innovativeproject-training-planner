const router = require("express").Router();
const OktaJwtVerifier = require("@okta/jwt-verifier");
let InviteTemplate = require("../models/inviteTemplate.model");

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: `${process.env.OKTA_ISSUER}`,
  clientId: `${process.env.OKTA_CLIENT_ID}`,
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

  console.log("authenticationRequired", req.headers.username);
  return oktaJwtVerifier
    .verifyAccessToken(accessToken, expectedAudience)
    .then(jwt => {
      req.jwt = jwt;
      next();
    })
    .catch(err => {
      res.status(401).send(err.message);
    });
}

router.route("/get/:searchQuery").get(authenticationRequired, (req, res) => {
  let regexBase = req.params.searchQuery.replace(/\s/g, "|");
  regexBase = new RegExp(regexBase, "gi");
  InviteTemplate.find({
    $or: [
      { title: { $regex: regexBase } },
      { instructor: { $regex: regexBase } },
      { description: { $regex: regexBase } }
    ],
    $and: [{ userName: req.headers.username }]
  })
    .then(inviteTemplate => res.json(inviteTemplate))
    .catch(err => res.status(400).json("Error: " + err));
});

// all query should have authenticationRequired like here
router.route("/all").get(authenticationRequired, (req, res) => {
  console.log("all user ", req.headers.username);
  InviteTemplate.find({
    $and: [{ userName: req.headers.username }]
  })
    .then(inviteTemplate => res.json(inviteTemplate))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/save").post((req, res) => {
  // req.body is a template as JSON
  const template = req.body;
  console.log(template);
  const newTemplate = new InviteTemplate(template);

  newTemplate
    .save()
    .then(() => res.json("Invite template saved!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  const template = req.body;
  console.log(template);
  InviteTemplate.updateOne({ _id: req.params.id }, template).then(() =>
    res.json("Invite template updated.")
  );
});

router.route("/delete/:_id").post((req, res) => {
  // req.params => template's ID
  InviteTemplate.deleteOne(req.params)
    .then(() => res.json("Invite template deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
