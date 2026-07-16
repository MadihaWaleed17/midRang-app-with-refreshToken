import jwt from 'jsonwebtoken'
import { NextFunction, Response } from "express";
import { AuthRequest } from '../interface/interface';


export const accessTokenMiddleware = (req:AuthRequest, res: Response, next:NextFunction) => {
    try {

         const accessToken = req.cookies.accessToken
        
        if(!accessToken)
        throw new Error("token is invalid")

        const decoded = jwt.verify(accessToken , process.env.SECRET_KEY!)as { id: string }
        req.user = decoded
      
       
        next()

    }
    catch (err) {
        console.log(err)
        if (err instanceof Error) {
            res.status(401).json({message:err.message})

        }
    }


}

