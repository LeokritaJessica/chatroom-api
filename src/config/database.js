//import dependencies
const mongoose = require("mongoose")
require("dotenv").config();

//import data
const { MONGO_URI } = process.env

//connection
try {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  //testing connection
  console.log('Connect to MongoDb ... ')
} catch(err) {
  console.log(('Could not connect to MongoDB...', err));
}

