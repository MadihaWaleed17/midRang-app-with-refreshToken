import { Router } from "express";
import {  login, signup, refreshToken, getSession } from "../controller/user.controller";
import RefreshToken from "../middleware/refreshToken";

export const UserRouter = Router()

UserRouter.post('/signup', signup)
UserRouter.post('/login', login)
UserRouter.get('/session', getSession )
UserRouter.get('/refreshToken', RefreshToken, refreshToken)


