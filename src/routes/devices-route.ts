import { Request, Response, Router } from "express";
import { checkRefreshToken } from "../middlewares/checkRefreshToken-middleware";
import { sessionsQuery } from "../repositories/query/query-Sessions";
import { userDbType } from "../types/user-type";



export const devicesRouter = Router({})



devicesRouter.get("/devices", checkRefreshToken,async(req:Request, res:Response) => {
    const user = req.user as userDbType
    const result = await sessionsQuery.getAllSessions(user._id.toString())
    if(!result) {
        res.end()
        return
    }
    res.status(200).send(result)
})