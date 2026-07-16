import { Request, Response } from "express";
import { FileModel } from "../model/file.model";
import { AuthRequest } from "../interface/interface";
import { UserModel } from "../model/user.model";
import fs from 'fs'
import path from "path";
export const dashboardFetch = async (req: AuthRequest, res: Response) => {
    try {

        const userId = req.user
        const data = await FileModel.aggregate([

            {
                $match:{userId:userId}
            },
            {
                $group: {
                    _id: "$type",
                    total: { $sum: 1 }

                }
            }
        ])
        res.json(data)
    }
    catch (err) {
        if (err) {
            if (err instanceof Error)
                res.status(500).json({ message: err.message })
        }
    }
}

export const updatePicture = async (req: AuthRequest, res: Response) => {

    try {
        const file = req.file

        if (!file) {
            return res.status(400).json({ message: "Picture is required" });
        }

        const userId = req.user.id

        const user = await UserModel.findByIdAndUpdate(userId, { image: file.filename }, { new: true });
       
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        res.json({ image: user.image })

    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
        }
    }
};

export const fetchProfile = async (req: AuthRequest, res: Response) => {
    try {
        const { image } = req.params
     

        if (!image)
            throw new Error("image not found")
        const img = Array.isArray(image) ? image[0] : image;
        const root = process.cwd()
        const file = path.join(root, 'files', img)

        res.sendFile(file, (err) => {
            if (err instanceof Error) {
                res.status(404).json({ message: err.message })
            }
        })

    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
        }
    }
}




