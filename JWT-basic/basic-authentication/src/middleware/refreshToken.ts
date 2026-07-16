import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { AuthRequest } from "../interface/interface";
import { UserModel } from "../model/user.model";


const RefreshToken = async (req: AuthRequest, res: Response, next: NextFunction)=>{
    try {
        const refreshToken = req.cookies.refreshToken

        if(!refreshToken)
            throw new Error("Failed to refresh token")
        

        const user = await UserModel.findOne({refreshToken})

        if(!user)
            throw new Error("Failed to refresh token")

        const today = moment()
        const expiry = moment(user.expiry)

        const isExpired = today.isAfter(expiry)

        if(isExpired)
           throw new Error("Failed to refresh token")

        req.user = {
            id: user.id,
            email: user.email,
            mobile: user.mobile,
            fullname: user.fullName,
            image: user.image
        }
        next()
    }
     catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
        }
    }
}

export default RefreshToken