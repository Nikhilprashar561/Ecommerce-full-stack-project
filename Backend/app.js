import express, { urlencoded } from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import UserRegister from "./routes/auth/auth.routee.js"

const app = express()

dotenv.config({
    path: './.env'
})

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: [
        "Content-type",
        "Authorization",
        "Pragma",
        "Cache-control",
        "Expires"
    ],
    credentials: true
}))

app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/auth", UserRegister)

export { app }