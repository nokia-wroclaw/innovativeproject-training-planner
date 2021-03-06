const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inviteTemplateSchema = new Schema(
    {
      date: {
        type: String,
        required: true,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      trainingType: {
        type: String,
        required: true,
      },
      instructor: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      agenda: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      willLearn: {
        type: String,
        required: true,
      },
      mustKnow: {
        type: String,
      },
      materials: {
        type: String,
      },
      userName: {
        type: Array,
      },
      sent: {
        type: Boolean,
      },
      openTrainging: {
        type: Boolean,
      },
      feedback: {
        type: Array,
      },
    },
    {
      timestamps: true,
    },
);

const InviteTemplate = mongoose.model('InviteTemplate', inviteTemplateSchema);

module.exports = InviteTemplate;
