//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: ["Username is required", true],
      minlength: 3,
      maxlength: 255,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Rooms,
      },
    ],
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
