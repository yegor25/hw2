import { blogDbType, blogType } from "../../types/blog-type"


export const blogHelper = {
    convertArrayDTO(data: blogDbType[]): blogType[] {
        const res: blogType[] = data.map((el: blogDbType) => ({
            id: el._id.toString(),
            description: el.description,
            name: el.name,
            websiteUrl: el.websiteUrl,
            isMembership: el.isMembership,
            createdAt: el.createdAt
        }))
        return res
    },
    convertDTO(data: blogDbType): blogType {
        return {
            id: data._id.toString(),
            description: data.description,
            name: data.name,
            websiteUrl: data.websiteUrl,
            createdAt: data.createdAt,
            isMembership: data.isMembership
        }
    }
}