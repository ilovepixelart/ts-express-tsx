import mongoose from 'mongoose'
import { patchHistoryPlugin } from 'ts-patch-mongoose'
import { USER_CREATED, USER_DELETED, USER_UPDATED } from '../constants/events.js'

import type { Model } from 'mongoose'
import type IUser from '../interfaces/IUser.js'

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'manager', 'user'],
      index: true,
    },
  },
  { timestamps: true },
)

UserSchema.plugin(patchHistoryPlugin, {
  eventCreated: USER_CREATED,
  eventUpdated: USER_UPDATED,
  eventDeleted: USER_DELETED,
  omit: ['__v', 'createdAt', 'updatedAt'],
})

const User = (mongoose.models.User as Model<IUser> | undefined) ?? mongoose.model<IUser>('User', UserSchema)

export default User
