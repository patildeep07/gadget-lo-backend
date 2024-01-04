const mongoose = require('mongoose')
const mongoURL = process.env.MONGOURI;

const initialiseDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURL)

    if (connection) {
      console.log('Connected to MongoDb')
    } 
  } catch (error) {
    console.log('Connection failed', error)
  }
}

module.exports = { initialiseDatabase }