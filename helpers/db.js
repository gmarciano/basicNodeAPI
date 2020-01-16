require('dotenv').config()

import mongoose from 'mongoose'

mongoose.set('useUnifiedTopology', true )

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true
})
mongoose.Promise = global.Promise

export default {
  User: require('../src/models/user.model'),
}