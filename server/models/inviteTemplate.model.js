const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inviteTemplateSchema = new Schema(
  {
    date: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    instructor: {
      type: String, // string for now, I'm thinking of creating custom type
      required: true
    },
    title: {
      type: String,
      required: true
    },
    agenda: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    willLearn: {
      type: String,
      required: true
    },
    mustKnow: {
      type: String
    },
    materials: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const InviteTemplate = mongoose.model("InviteTemplate", inviteTemplateSchema);

module.exports = InviteTemplate;
