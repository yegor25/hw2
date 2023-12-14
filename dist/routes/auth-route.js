"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_validator_1 = require("../middlewares/auth-validator");
const register_validator_1 = require("../middlewares/register-validator");
const codeConfirmation_validator_1 = require("../middlewares/codeConfirmation-validator");
const resendingEmail_validator_1 = require("../middlewares/resendingEmail-validator");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const checkRefreshToken_middleware_1 = require("../middlewares/checkRefreshToken-middleware");
const rateLimiting_middleware_1 = require("../middlewares/rateLimiting-middleware");
const passRecovery_validation_1 = require("../middlewares/passRecovery-validation");
const user_validation_1 = require("../middlewares/user-validation");
const recoveryCode_validator_1 = require("../middlewares/recoveryCode-validator");
const login_middleware_1 = require("../middlewares/login-middleware");
const composition_root_1 = require("../composition-root");
exports.authRouter = (0, express_1.Router)({});
//
// const authControllerInstance = new AuthController(new AuthService(new UserRepository()), new UserService(new UserRepository()))
exports.authRouter.post("/login", auth_validator_1.authValidator, auth_validator_1.authValidate, rateLimiting_middleware_1.rateLimiting, login_middleware_1.loginMiddleware, composition_root_1.authControllerInstance.loginUser.bind(composition_root_1.authControllerInstance));
exports.authRouter.post("/registration", rateLimiting_middleware_1.rateLimiting, register_validator_1.registerValidator, register_validator_1.registerValidate, composition_root_1.authControllerInstance.register.bind(composition_root_1.authControllerInstance));
exports.authRouter.post("/registration-confirmation", rateLimiting_middleware_1.rateLimiting, codeConfirmation_validator_1.codeConfiramtionValidator, codeConfirmation_validator_1.validateCodeConfirmation, composition_root_1.authControllerInstance.registerConfirmation.bind(composition_root_1.authControllerInstance));
exports.authRouter.post("/registration-email-resending", rateLimiting_middleware_1.rateLimiting, resendingEmail_validator_1.resendingEmailValidator, resendingEmail_validator_1.validateResendingEmail, composition_root_1.authControllerInstance.resendingEmail.bind(composition_root_1.authControllerInstance));
exports.authRouter.get("/me", auth_middleware_1.authMiddleware, composition_root_1.authControllerInstance.authMe.bind(composition_root_1.authControllerInstance));
exports.authRouter.post("/logout", checkRefreshToken_middleware_1.checkRefreshToken, composition_root_1.authControllerInstance.logout.bind(composition_root_1.authControllerInstance));
exports.authRouter.post("/refresh-token", checkRefreshToken_middleware_1.checkRefreshToken, composition_root_1.authControllerInstance.refreshToken.bind(composition_root_1.authControllerInstance));
exports.authRouter.post("/password-recovery", rateLimiting_middleware_1.rateLimiting, passRecovery_validation_1.passRecoveryValidation, user_validation_1.userValidate, composition_root_1.authControllerInstance.recoverPass.bind(composition_root_1.authControllerInstance));
exports.authRouter.post("/new-password", rateLimiting_middleware_1.rateLimiting, recoveryCode_validator_1.recoveryCodeValidator, user_validation_1.userValidate, composition_root_1.authControllerInstance.changePswd.bind(composition_root_1.authControllerInstance));
//https://it-incubator.atlassian.net/wiki/spaces/STUD/pages/381911041/Google
