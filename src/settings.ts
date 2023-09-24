import express, {Request, Response} from "express";
import { blogRouter } from "./routes/blog-route";
import { postRouter } from "./routes/post-route";
import { testingRouter } from "./routes/testing-route";


export const app = express()

app.use(express.json())

app.use("/blogs", blogRouter)
app.use("/posts", postRouter)
app.use("/testing", testingRouter)
app.get("/",(req:Request, res:Response) => {
    res.send("this is second homework")
})