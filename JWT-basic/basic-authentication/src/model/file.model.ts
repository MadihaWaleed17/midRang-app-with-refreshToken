import mongoose, { model, Schema } from "mongoose"


const FileSchema = new Schema({

    filename: {
        type: String,
        required: true,
        trim: true,
        lowecase: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    ,
    path: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,

    },

    size: {
        type: Number,
        trim: true,

    }

}, { timestamps: true })

export const FileModel = model('File', FileSchema)