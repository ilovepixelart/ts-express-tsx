import { Router } from 'express'
import User from '../models/User'

import type { Request, Response } from 'express'

const router = Router()

/* GET users listing. */
router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().select({ _id: 0, name: 1, role: 1 }).cache('1 minute').exec()
  res.json(users)
})

export default router
