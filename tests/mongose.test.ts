import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

describe('mongoose', async () => {
  const mongod = await MongoMemoryServer.create()

  beforeAll(async () => {
    const uri = mongod.getUri()
    await mongoose.connect(uri)
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
  })

  it('should insert a doc into collection', async () => {
    const users = mongoose.connection.db?.collection('users')

    const mockUser = { name: 'John' }
    const user = await users?.insertOne(mockUser)

    const insertedUser = await users?.findOne({ _id: user?.insertedId })
    expect(insertedUser).toEqual(mockUser)
  })
})
