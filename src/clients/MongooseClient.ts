import mongoose from 'mongoose'

import optionsMongoose from '../options/mongoose'

import type { MongooseError } from 'mongoose'

// https://mongoosejs.com/docs/guide.html#strictQuery
mongoose.set('strictQuery', false)

mongoose.connection.on('error', (err: MongooseError) => {
  console.error(err.message)
})

mongoose.connection.on('connecting', () => {
  console.info('Connecting to MongoDB...')
})

mongoose.connection.on('connected', () => {
  console.info('Connected to MongoDB')
})

mongoose.connection.on('disconnected', () => {
  console.info('Disconnected from MongoDB')
})

mongoose.connection.on('reconnect', () => {
  console.info('Reconnecting to MongoDB...')
})

export default {
  connect: () => mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/express', optionsMongoose),
  isConnected: () => mongoose.connection.readyState === 1
}
