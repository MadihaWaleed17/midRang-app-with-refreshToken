import { Router } from 'express'
import { createFile, deleteFetch, downloadFile, fetchFile } from '../controller/file.controller'
import upload from '../middleware/storage'
import { dashboardFetch, fetchProfile, updatePicture } from '../controller/dashboard'
import { shareFile } from '../controller/share.controller'


const FileRouter = Router()
FileRouter.post('/profile-picture', upload.single('picture'), updatePicture)
FileRouter.get('/profile-picture/:image', fetchProfile)
FileRouter.post('/', upload.single('file'), createFile)
FileRouter.get('/', fetchFile)
FileRouter.delete('/:id', deleteFetch)
FileRouter.get('/download/:id', downloadFile)
FileRouter.get('/dashboard', dashboardFetch)
FileRouter.post('/share', shareFile)


export default FileRouter


