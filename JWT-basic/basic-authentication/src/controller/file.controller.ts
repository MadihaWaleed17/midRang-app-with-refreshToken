import { Request, Response } from "express";
import { FileModel } from "../model/file.model";
import fs from 'fs'
import path from 'path'
import { AuthRequest } from "../interface/interface";

export const createFile = async (req: AuthRequest, res: Response) => {

    try {
        const { filename } = req.body
        const file = req.file

        const payload = {
            filename: filename,
            path: `${file?.destination}/${file?.filename}`,
            type: file?.mimetype,
            size: file?.size,
            userId: req.user.id
        }

        const newFile = await FileModel.create(payload)
        res.json(newFile)
    }
    catch (err) {
        if (err instanceof Error) {
            res.json({ message: err.message })
        }
    }
}
export const fetchFile = async (req: AuthRequest, res: Response) => {
    try {
        const limit = Number(req.query.limit)
        const data = await FileModel.find({ userId: req.user.id }).sort({ createdAt:-1}).limit(limit)

        res.json(data)
    }
    catch (err) {
        if (err instanceof Error) {
            res.json({ message: err.message })
        }
    }
}

export const deleteFetch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const file = await FileModel.findByIdAndDelete(id)

        if (!file)
            throw new Error("file not found")
        if (!file.path || file.type || file.size)
            throw new Error("File invalid")

        fs.unlinkSync(file.path)

        res.json(file)
    }
    catch (err) {
        if (err instanceof Error) {
            res.json({ message: err.message })
        }
    }
}

export const downloadFile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const file = await FileModel.findById(id)

        if (!file)
            throw new Error("file not found")
        if (!file.path || !file.type || !file.size)
            throw new Error("File invalid")

        const root = process.cwd()
        const filePath = path.join(root, file.path)

        res.setHeader("Content-Disposition", `attachment; filename="${file.filename}"`);

        res.sendFile(filePath, (err) => {
            if (err) {
                console.log(err);
                throw new Error("File not download");
            }
        });

    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
        }
    }
}


