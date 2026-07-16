import mongoose, { model, Schema } from "mongoose"


const ShareSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    receiverEmail: {
        type: String,
        required: true
    },

    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: true
    }



}, { timestamps: true })

export const ShareModel = model('shareFile', ShareSchema)