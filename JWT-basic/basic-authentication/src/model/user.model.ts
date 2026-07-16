import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new Schema({

    image: {
        type: String
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        lowecase: true
    },
    mobile: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email address"]
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    refreshToken: {
        type: String
    },
    expiry: {
        type: Date
    }

}, { timestamps: true })



UserSchema.pre("save", async function () {
    const count = await model("User").countDocuments({ mobile: this.mobile })

    if (count > 0)
        throw new Error("mobile already exit")
})

UserSchema.pre("save", async function () {
    const count = await model("User").countDocuments({ email: this.email })

    if (count > 0)
        throw new Error("email already exit")
})

UserSchema.pre("save", async function () {

    const encryptedPassword = await bcrypt.hash(this.password.toString(), 12)
    this.password = encryptedPassword


})

UserSchema.pre("save", function () {
    this.refreshToken = null,
        this.expiry = null
})



export const UserModel = model("User", UserSchema)