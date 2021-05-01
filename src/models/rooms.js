//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const roomSchema = new Schema(
  {
    rooms: {
      type: String,
      required: ["Rooms is required", true],
      minlength: 3,
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
    collection: "rooms",
  }
);

//Export modules
module.exports = mongoose.model("Rooms", roomSchema);
