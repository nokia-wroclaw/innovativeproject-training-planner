const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
);

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
