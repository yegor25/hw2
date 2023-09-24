import { NextFunction, Request, Response } from "express"

export const checkAuth = (req:Request, res:Response, next: NextFunction) => {
    const user = req.headers["authorization"]
    const encode =  atob(user?.split(" ").splice(1,1).join(" ") as string)
    const encodeArray = encode.split(":")
    if(encodeArray.length !== 2){
        res.sendStatus(401)
        return
    }
    if(encodeArray[0] === "admin" && encodeArray[1] === "qwerty"){
       return next()
    } else {
        res.sendStatus(401)
    }
    
}