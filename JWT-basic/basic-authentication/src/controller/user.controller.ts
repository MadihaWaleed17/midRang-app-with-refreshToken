
import { Request, Response } from "express";
import { UserModel } from "../model/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'

import { payloadInterface } from "../interface/interface";
import { AuthRequest } from "../interface/interface";
import moment from "moment";

const accessTokenExpiry = '10m'
const tenMinuteInMs = (10 * 60 * 60) * 1000
const sevenDaysInMs = (7 * 24 * 60 * 60) * 1000

type TokenType = 'rt' | 'at'

const generateToken = (payload: payloadInterface) => {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: accessTokenExpiry })
    const refreshToken = uuid()
    return {
        accessToken,
        refreshToken
    }
}

const getOptions = (tokenType: TokenType) => {
    return {
        httpOnly: true,
        maxAge: tokenType === "at" ? tenMinuteInMs : sevenDaysInMs,
        secure: false,
        domain: 'localhost'
    }
}

export const signup = async (req: Request, res: Response) => {
    try {

        await UserModel.create(req.body)
        res.status(200).json({ message: "signup success" })
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
        }
    }
}

export const login = async (req: Request, res: Response) => {
    try {


        const { email, password } = req.body

        const user = await UserModel.findOne({ email })

        if (!user)
            throw new Error("User not found")

        const isLogin = await bcrypt.compare(password, user.password)

        if (!isLogin)
            throw new Error("invalid User")

        const payload: payloadInterface = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            mobile: user.mobile
        }

        const { accessToken, refreshToken } = generateToken(payload)
        await UserModel.updateOne({ _id: user._id }, {
            $set: {
                refreshToken,
                expiry: moment().add(7, 'days').toDate()
            }
        })

        res.cookie("accessToken", accessToken, getOptions('at'))
        res.cookie("refreshToken", refreshToken, getOptions('rt'))
        res.json({ message: "login successfulh" })

    }
    catch (err) {
        console.log("ERROR CAUGHT:", err);
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
        }
    }
}

export const session = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user
        const user = await UserModel.findById(userId).select("-password")
        if (!user)
            throw new Error('User not found')
        return res.json(user)
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
        }
    }
}

export const refreshToken = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user)
            throw new Error("Failed to refresh token")

        const { accessToken, refreshToken } = generateToken(req.user)

        await UserModel.updateOne({ _id: req.user.id}, {
            $set: {
                refreshToken,
                expiry: moment().add(7, 'days').toDate()
            }
        })
        res.cookie("accessToken", accessToken, getOptions('at'))
        res.cookie("refreshToken", refreshToken, getOptions('rt'))
        res.json({ message: 'Token refreshed' })
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
        }
    }
}

export const getSession = async (req: Request, res: Response)=>{
    try {
        const accessToken = req.cookies.accessToken

        if(!accessToken)
            throw new Error("Invalid session")

        const session = await jwt.verify(accessToken, process.env.SECRET_KEY!)
        res.json(session)
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
        }
}
}

