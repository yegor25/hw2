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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailAdapter = void 0;
//jckm kpux qswi tltc
const nodemailer_1 = __importDefault(require("nodemailer"));
// export const mailAdapter = {
//     transporter: nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: "itvolear@gmail.com",
//             pass: "jckm kpux qswi tltc"
//         }
//     }),
//    async  send(email: string,subject: string,message: string) {
//         let info = this.transporter.sendMail({
//             from: "itvolear@gmail.com",
//             to: email,
//             subject: subject,
//             html: message
//         })
//         return info
//     }
// }
class transporterClass {
    createTransport() {
        return nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "itvolear@gmail.com",
                pass: "jckm kpux qswi tltc"
            }
        });
    }
}
class MailAdapter {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "itvolear@gmail.com",
                pass: "jckm kpux qswi tltc"
            }
        });
    }
    send(email, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = this.transporter.sendMail({
                from: "itvolear@gmail.com",
                to: email,
                subject: subject,
                html: message
            });
            return info;
        });
    }
}
exports.mailAdapter = new MailAdapter();
