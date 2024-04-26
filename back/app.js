import express from "express"
import multer from 'multer'
import mongoose from "mongoose"

import { loginValidator, postCreateValidator, registerValidator } from "./validations.js"

import { PostController, UserController, TestController } from './controllers/index.js'
import { handleValidationErrors, checkAuth } from './utils/index.js'
import cors from 'cors'

mongoose.connect(
    'mongodb+srv://321mig123:megatron186@dolg.ouiafse.mongodb.net/blog?retryWrites=true&w=majority&appName=Dolg'
).then(() => {console.log("db ok")})

const app  = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login)
app.post("/auth/register", registerValidator, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/tags', PostController.getLastTags)

app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidator, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidator, handleValidationErrors, PostController.update)


app.get('/test', TestController.getAll)

app.get('/test/:id', TestController.getOne)
app.post('/test', checkAuth, handleValidationErrors, TestController.create)
app.delete('/test/:id', checkAuth, TestController.remove)
app.patch('/test/:id', checkAuth, handleValidationErrors, TestController.update)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("serv ok")
})


