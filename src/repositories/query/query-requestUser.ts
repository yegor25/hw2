import { requestUserCollections } from "../../db"


export const QueryRequestUser = {
    async countLastRequet(url: string, ip: string):Promise<number>{
        const filterDate = new Date(Date.now() - 10000)
        const count = await requestUserCollections.countDocuments({URL: url, IP:ip, date: {$gte: filterDate} })
        return count
    }
}