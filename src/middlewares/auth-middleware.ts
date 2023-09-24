import { NextFunction, Request, Response } from "express"

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const user = req.headers["authorization"]

    if (!user) {
        res.sendStatus(401)
        return
    }
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
    const isBase64 = base64regex.test(user)
    if (isBase64) {
        const encode = atob(user?.split(" ").splice(1, 1).join(" ") as string)
        const encodeArray = encode.split(":")
        if (encodeArray.length !== 2) {
            res.sendStatus(401)
            return
        }
        if (encodeArray[0] === "admin" && encodeArray[1] === "qwerty") {
            return next()
        } else {
            res.sendStatus(401)
            return
        }
    } else {
        const data = user?.split(" ").splice(1, 1)
        if (data[0] === "admin" && data[1] === "qwerty") {
            return next()
        } else {
            res.sendStatus(401)
            return
        }
    }


}