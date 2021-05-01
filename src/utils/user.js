const users = [];

//join user to chat
const userJoin = (id, username, roomId) => {
  const user = { id, username, roomId };

  users.push(user);

  return user;
};

//get current user
const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

//user leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};
//module export
module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
};
