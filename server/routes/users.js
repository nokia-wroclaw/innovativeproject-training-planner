const router = require('express').Router();
const Users = require('../models/users.model');
const okta = require('../toolset/okta');

router.route('/is_user/').get(okta.checkIfUser, (req, res) => {
  // req.params is template's ID
  console.log('here1');
  Users.find({name: req.headers.username})
      .then((users) => {
        console.log(users.length);
        if (!users.length) {
          console.log('Create');
          const userT = {
            name: req.headers.username,
            type: 'user',
          };
          const newUser = new Users(userT);

          newUser
              .save()
              .then(() => res.json('Now you have account'))
              .catch((err) => res.json('Error: ' + err));
        } else {
          console.log('Exist');
        }
      })
      .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
