import multer from "multer"
import {v4 as uuid} from 'uuid'

export const storage = multer.diskStorage({
    destination: function(req, file, next){
        next(null, 'files')
    },
    filename: function(req, file, next){
        const ext = file.originalname.split('.')[1]
        const filename = `${uuid()}.${ext}`
        next(null, filename)

    }
})

const upload = multer({storage:storage})

export default upload