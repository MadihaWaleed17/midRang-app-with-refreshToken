import mongoose from "mongoose"
import { Request } from "express"; 



export interface payloadInterface {
    id:mongoose.Types.ObjectId,
    fullName:string,
    email:string,
    mobile:string
}

export interface AuthRequest extends Request {
    user?: any,
  
}

export interface refreshInterface{
    user:mongoose.Types.ObjectId,
    type:string
}

