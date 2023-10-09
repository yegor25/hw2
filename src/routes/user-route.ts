import { Router, Response } from "express";
import { requestWithBody, requestWithParams } from "../types/root-type";
import { userInputType } from "../types/user-type";
import { userService } from "../domain/user-service";
import { checkAuth } from "../middlewares/auth-middleware";
import { userValidate, userValidator } from "../middlewares/user-validation";



export const userRouter = Router({})

userRouter.post("/", checkAuth,userValidator, userValidate ,async(req:requestWithBody<userInputType>, res:Response) => {
    const user = await userService.createUser(req.body)
    if(!user){
        res.sendStatus(400)
        return
    }
    res.status(201).send(user)
})

userRouter.delete("/:id", checkAuth,async (req:requestWithParams<{id: string}>, res: Response) => {
    const deleteUser = await userService.deleteUser(req.params.id)
    if(!deleteUser){
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})