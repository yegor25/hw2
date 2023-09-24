"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    const user = req.headers["authorization"];
    const encode = atob(user === null || user === void 0 ? void 0 : user.split(" ").splice(1, 1).join(" "));
    const encodeArray = encode.split(":");
    if (encodeArray.length !== 2) {
        res.sendStatus(401);
        return;
    }
    if (encodeArray[0] === "admin" && encodeArray[1] === "qwerty") {
        return next();
    }
    else {
        res.sendStatus(401);
    }
};
exports.checkAuth = checkAuth;
