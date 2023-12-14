"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const settings_1 = require("./settings");
const port = 3000;
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    settings_1.app.listen(port, () => {
        console.log("server running...");
    });
});
// const user = {
//     age: 18,
//     showAge(){
//         console.log(this.age)
//     }
// }
// const animal = {
//     age: 10,
//     showAge(){
//         console.log(this.age)
//     }
// }
// setInterval(user.showAge,1000)
startApp();
const items = [{ "id": "65324b47199c1b4dc269c58c", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:27.879Z" }, { "id": "65324b47199c1b4dc269c58b", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:27.468Z" }, { "id": "65324b47199c1b4dc269c58a", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:27.053Z" }, { "id": "65324b46199c1b4dc269c589", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:26.644Z" }, { "id": "65324b46199c1b4dc269c588", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:26.149Z" }, { "id": "65324b45199c1b4dc269c587", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:25.741Z" }, { "id": "65324b45199c1b4dc269c586", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:25.325Z" }, { "id": "65324b44199c1b4dc269c585", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:24.916Z" }, { "id": "65324b44199c1b4dc269c584", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:24.508Z" }, { "id": "65324b44199c1b4dc269c583", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:24.101Z" }];
console.log(items.length);
const items2 = [{ "id": "65324b47199c1b4dc269c58c", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:27.879Z" }, { "id": "65324b47199c1b4dc269c58b", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:27.468Z" }, { "id": "65324b47199c1b4dc269c58a", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:27.053Z" }, { "id": "65324b46199c1b4dc269c589", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:26.644Z" }, { "id": "65324b46199c1b4dc269c588", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:26.149Z" }, { "id": "65324b45199c1b4dc269c587", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:25.741Z" }, { "id": "65324b45199c1b4dc269c586", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:25.325Z" }, { "id": "65324b44199c1b4dc269c585", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:24.916Z" }, { "id": "65324b44199c1b4dc269c584", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:24.508Z" }, { "id": "65324b44199c1b4dc269c583", "content": "length_21-weqweqweqwq", "commentatorInfo": { "userId": "65324b3f199c1b4dc269c57b", "userLogin": "lg-878628" }, "createdAt": "2023-10-20T09:41:24.101Z" }];
console.log(items2.length);
