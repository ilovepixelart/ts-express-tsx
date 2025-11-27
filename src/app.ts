import path from 'node:path'
import cookieParser from 'cookie-parser'
import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

import type { NextFunction, Request, Response } from 'express'
import type { HttpError } from 'http-errors'

const app = express()

// view engine setup
app.set('views', path.join(import.meta.dirname, '../public/views.js'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(import.meta.dirname, '../public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createError(404))
})

// error handler
app.use((error: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = error.message
  res.locals.error = req.app.get('env') === 'development' ? error : {}

  // render the error page
  res.status(error.status || 500)
  res.render('error')
})

export default app
