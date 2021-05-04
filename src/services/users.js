//import model
const userModel = require("../models/users");

//module export
module.exports = {
  userValidate: async (username, roomId) => {
    const name = `^${username}$`;
    const findUser = await userModel.findOne({
      username: { $regex: name, $options: "i" },
      roomId,
    });
    return !findUser;
  },
  userJoin: async (socketId, username, roomId) => {
    const userData = { socketId, username, roomId };
    //Create new user
    const user = new userModel(userData);
    return await user.save();
  },
  getCurrentUser: async (socketId) => {
    return await userModel.findOne({ socketId });
  },
  userLeave: async (socketId) => {
    return await userModel.findOneAndDelete({ socketId });
  },
};
