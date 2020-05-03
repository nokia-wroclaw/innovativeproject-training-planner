const router = require('express').Router();
const InviteTemplate = require('../models/inviteTemplate.model');
const okta = require('../toolset/okta');

router
    .route('/get/:searchQuery')
    .get(okta.authenticationRequired, (req, res) => {
      let regexBase = req.params.searchQuery.replace(/\s/g, '|');
      regexBase = new RegExp(regexBase, 'gi');
      InviteTemplate.find({
        $or: [
          {title: {$regex: regexBase}},
          {instructor: {$regex: regexBase}},
          {description: {$regex: regexBase}},
        ],
        $and: [{userName: req.headers.username}],
      })
          .then((inviteTemplate) => res.json(inviteTemplate))
          .catch((err) => res.status(400).json('Error: ' + err));
    });

// all query should have okta.authenticationRequired like here
router.route('/all').get(okta.authenticationRequired, (req, res) => {
  InviteTemplate.find({
    $and: [{userName: req.headers.username}],
  })
      .then((inviteTemplate) => res.json(inviteTemplate))
      .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/pending').get(okta.authenticationRequired, (req, res) => {
  InviteTemplate.find({
    $and: [{userName: req.headers.username}, {sent: false}],
  })
      .then((inviteTemplate) => res.json(inviteTemplate))
      .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/sent').get(okta.authenticationRequired, (req, res) => {
  InviteTemplate.find({
    $and: [{userName: req.headers.username}, {sent: true}],
  })
      .then((inviteTemplate) => res.json(inviteTemplate))
      .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/openTraining').get(okta.authenticationRequired, (req, res) => {
  InviteTemplate.find({
    $and: [{openTrainging: true}],
  })
      .then((inviteTemplate) => res.json(inviteTemplate))
      .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/save').post(okta.authenticationRequired, (req, res) => {
  // req.body is a template as JSON
  const template = req.body;
  const newTemplate = new InviteTemplate(template);

  newTemplate
      .save()
      .then(() => res.json('Template saved!'))
      .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(okta.authenticationRequired, (req, res) => {
  const template = req.body;
  InviteTemplate.updateOne({_id: req.params.id}, template).then(() =>
    res.json('Template updated.'),
  );
});

router.route('/delete/:_id').post(okta.authenticationRequired, (req, res) => {
  // req.params => template's ID
  InviteTemplate.deleteOne(req.params)
      .then(() => res.json('Template deleted!'))
      .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
