"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsHelper = void 0;
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
exports.sessionsHelper = {
    sessionMapperForDb(data) {
        const { ip, title, userId } = data;
        const res = {
            _id: new mongodb_1.ObjectId(),
            title,
            userId,
            ip,
            deviceId: (0, uuid_1.v4)(),
            lastActiveDate: new Date().toISOString(),
            isActive: true
        };
        return res;
    },
    sessionViewMapper(data) {
        const { ip, title, lastActiveDate, deviceId } = data;
        const res = {
            ip,
            title,
            lastActiveDate,
            deviceId
        };
        return res;
    },
    sesionsViewMapperArray(data) {
        return data.map(el => this.sessionViewMapper(el));
    }
};
