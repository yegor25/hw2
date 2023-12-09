import { Request, Response, Router } from "express";
import { checkRefreshToken } from "../middlewares/checkRefreshToken-middleware";
import { sessionsQuery } from "../repositories/query/query-Sessions";
import { userDbType } from "../types/user-type";
import { requestWithParams } from "../types/root-type";
import { sessionService } from "../domain/session-service";



export const devicesRouter = Router({})



devicesRouter.get("/devices", checkRefreshToken, async (req: Request, res: Response) => {
    
    const user = req.user as userDbType
    const result = await sessionsQuery.getAllSessions(user._id.toString())
    console.log("result get", result)
    if (!result) {
        res.end()
        return
    }
    res.status(200).send(result)
})
devicesRouter.delete("/devices", checkRefreshToken, async (req: Request, res: Response) => {
    const user = req.user as userDbType
    const result = await sessionService.deleteAllsessionsBesideCurrenr(req.body.deviceId, user._id.toString())
    if (!result) {
        res.end()
        return
    }
    res.sendStatus(204)

})
devicesRouter.delete("/devices/:deviceId", checkRefreshToken, async (req: requestWithParams<{ deviceId: string }>, res: Response) => {
    const session = await sessionsQuery.checkUserSession(req.params.deviceId)
    if (session && session.userId !== req.user?._id.toString()) {
        res.sendStatus(403)
        return
    }
    const result = await sessionService.deleteSession(req.params.deviceId)
    if (!result) {
        res.sendStatus(404)
        return
    }
   
    res.sendStatus(204)
})