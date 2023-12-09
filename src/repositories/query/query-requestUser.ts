import { ReqUserModel } from "../../db"


// export const QueryRequestUser = {
//     async countLastRequet(url: string, ip: string):Promise<number>{
//         const filterDate = new Date(Date.now() - 10000)
//         const count = await ReqUserModel.countDocuments({URL: url, IP: ip, date: {$gte: new Date(filterDate)}})
//         return count
//     }
// }


class queryRequestUser {
    async countLastRequet(url: string, ip: string):Promise<number>{
        const filterDate = new Date(Date.now() - 10000)
        const count = await ReqUserModel.countDocuments({URL: url, IP: ip, date: {$gte: new Date(filterDate)}})
        return count
    }
}

export const QueryRequestUser = new queryRequestUser()