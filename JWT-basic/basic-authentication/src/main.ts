import dotenv from 'dotenv'
dotenv.config()

const ENV = process.env
import mongoose from 'mongoose'
mongoose.connect(`${ENV.MONGO_URL}`)

    .then(() => console.log("Database connected"))

    .catch((err) => {
        console.log(`Database connection failed - ${err.message}`)
    })

import express, { Request, Response } from 'express'

import morgan from 'morgan'
const app = express()
app.listen(ENV.PORT, () => console.log(`Server is running on ${process.env.DOMAIN}`))

import cors from 'cors'
import cookieParser from 'cookie-parser'
import { UserRouter } from './router/user.router'
import FileRouter from './router/file.router'
import { accessTokenMiddleware } from './middleware/accessToken.middleware'
app.use(cors({
    origin: `${process.env.CLIENT}`,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))




app.use('/auth', UserRouter)
app.use('/file', accessTokenMiddleware ,FileRouter)
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: `${req.url} not found` })
})