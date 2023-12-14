import { blogDbType, blogType } from "../../types/blog-type";
export declare const blogHelper: {
    convertArrayDTO(data: blogDbType[]): blogType[];
    convertDTO(data: blogDbType): blogType;
};
