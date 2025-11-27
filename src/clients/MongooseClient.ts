import mongoose from 'mongoose'
import cache from 'ts-cache-mongoose'
import optionsMongoose from '../options/mongoose.js'

import type { Mongoose, MongooseError } from 'mongoose'

// Run project, open localhost:3000/users to see the cache in action, by refreshing the page
cache.init(mongoose, {
  engine: 'memory',
  // This is for demo purposes, you should not use this in production
  debug: true,
})

// In case you using mongoose 6
// https://mongoosejs.com/docs/guide.html#strictQuery
mongoose.set('strictQuery', false)

mongoose.connection.on('error', (error: MongooseError) => {
  console.error(error.message)
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
  connect: async (): Promise<Mongoose> => {
    await mongoose.connect(process.env.MONGO_URI ?? 'mongodb://localhost:27017/express', optionsMongoose)
    return mongoose
  },
  isConnected: (): boolean => Number(mongoose.connection.readyState) === 1,
}
