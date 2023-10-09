"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogHelper = void 0;
exports.blogHelper = {
    convertArrayDTO(data) {
        const res = data.map((el) => ({
            id: el._id.toString(),
            description: el.description,
            name: el.name,
            websiteUrl: el.websiteUrl,
            isMembership: el.isMembership,
            createdAt: el.createdAt
        }));
        return res;
    },
    convertDTO(data) {
        return {
            id: data._id.toString(),
            description: data.description,
            name: data.name,
            websiteUrl: data.websiteUrl,
            createdAt: data.createdAt,
            isMembership: data.isMembership
        };
    }
};
