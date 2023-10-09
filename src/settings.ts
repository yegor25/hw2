import express, {Request, Response} from "express";
import { blogRouter } from "./routes/blog-route";
import { postRouter } from "./routes/post-route";
import { testingRouter } from "./routes/testing-route";
import { userRouter } from "./routes/user-route";
import { authRouter } from "./routes/auth-route";


export const app = express()

app.use(express.json())

app.use("/blogs", blogRouter)
app.use("/posts", postRouter)
app.use("/users",userRouter)
app.use("/auth", authRouter)
app.use("/testing", testingRouter)
app.get("/",(req:Request, res:Response) => {
    res.send("this is second homework")
})