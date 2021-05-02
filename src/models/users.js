//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: ["Username is required", true],
      maxlength: 255,
    },
    socketId: {
      type: String,
    },
    roomId: {
      type: String,
      required: ["roomId is required", true],
      maxlength: 255,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

//Export modules
module.exports = mongoose.model("User", userSchema);
