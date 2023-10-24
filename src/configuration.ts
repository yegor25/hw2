import dotenv from "dotenv"
dotenv.config()

export const configuration = {
    ACCESS_SECRET: process.env.ACCESS_SECRET || "1ds1ew",
    REFRESH_SECRET: process.env.REFRESH_SECRET || "1ds1ewWQQW",
}