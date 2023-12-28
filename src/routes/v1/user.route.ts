import { Router } from "express";
import UserController from "../../controllers/user.controller";
import * as Validation from "../../helpers/validation.helper";
import expressValidator from "express-joi-validation";
import passport from "passport";
const validator = expressValidator.createValidator({
  passError: true,
  statusCode: 400,
});
const router = Router();


router.post("/user_login",validator.body(Validation.userLogin),UserController.userLogin);


router.post("/user_authenticate",validator.body(Validation.userAuthenticate),UserController.verifyEmailToken);


export default router;
