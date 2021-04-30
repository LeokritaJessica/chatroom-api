//Import dotenv
require("dotenv").config();

//import server
const server = require("./src/server");

//dotenv
const { PORT, NODE_ENV } = process.env;

//start server
server.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT} and use ${NODE_ENV}`);
})

//module exports
module.exports = server;