const router = require('express').Router();
const Users = require('../models/users.model');
const okta = require('../toolset/okta');

router.route('/isUser').get(okta.authenticationRequired, (req, res) => {
  // req.params is template's ID
  Users.find({name: req.headers.username})
      .then((users) => {
        console.log(users.length);
        if (!users.length) {
          console.log('This user does not exist');
          const userTemp = {
            name: req.headers.username,
            type: 'user',
          };
          const newUser = new Users(userTemp);

          newUser
              .save()
              .then(() => res.json('Now you have account'))
              .catch((err) => res.json('Error: ' + err));
        } else {
          console.log('This user exist');
        }
      })
      .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
