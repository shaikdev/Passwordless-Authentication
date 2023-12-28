import HTTP from "http-status-codes";
import {
  STATUS,
  TOKEN_RESPONSE,
  USER_RESPONSE,
} from "../constants/response.constant";
import Mail from "../helpers/ses.helper";
import { EMAIL_TEMPLATES } from "../constants/email.constant";
import ShortUniqueId from "short-unique-id";
import {
  INextFunction,
  IRequest,
  IResponse,
  IUser,
  IUserList,
  IUserListQuery,
} from "../helpers/interface.helper";
import UserService from "../services/user.service";
import bcrypt from "bcryptjs";
import moment from "moment";
import _ from "lodash";
import { USER } from "../constants/user.constant";
import TokenService from "../services/token.service";
import { generateNumber } from "../helpers/function.helper";

const userController = {
  userLogin: async (req: IRequest, res: IResponse, next: INextFunction) => {
    try {
      let user: IUser;
      const email = req.body.email.trim().toLowerCase();
      user = await UserService.userDetails(undefined, email);
      if (_.isEmpty(user)) {
        user = await UserService.createUser({ email });
        if (_.isEmpty(user)) {
          return res.status(HTTP.UNPROCESSABLE_ENTITY).send({
            status: STATUS.FAILED,
            message: "Failed to register",
          });
        }
      }
      const expireEmailToken = new Date(new Date().getTime() + 10 * 60 * 1000);

      const tokenBody = {
        user_id: user.id,
        expire: expireEmailToken,
        type: "EMAIL",
        email_token: generateNumber(),
      };

      const token = await TokenService.createToken(tokenBody);
      if (_.isEmpty(token)) {
        return res.status(HTTP.UNPROCESSABLE_ENTITY).send({
          status: STATUS.FAILED,
          message: TOKEN_RESPONSE.TOKEN_CREATE_FAILED,
        });
      }

      return res.send({
        status: STATUS.SUCCESS,
        message: "Register successfully",
        data: token,
      });
    } catch (err: any) {
      err.description = "Failed to register";
      next(err);
    }
  },

  verifyEmailToken: async (
    req: IRequest,
    res: IResponse,
    next: INextFunction
  ) => {
    try {
      const { email_token, email } = req.body;
      const tokenVerify: any = await TokenService.getToken(email_token);
      if (_.isEmpty(tokenVerify)) {
        return res
          .status(HTTP.UNAUTHORIZED)
          .send({ status: STATUS.FAILED, message: "Email token invalid" });
      }
      if (tokenVerify.user.email !== email || !tokenVerify.valid) {
        return res
          .status(HTTP.UNAUTHORIZED)
          .send({ status: STATUS.FAILED, message: "Email token invalid" });
      }

      if (tokenVerify.expire < new Date()) {
        return res
          .status(HTTP.UNAUTHORIZED)
          .send({ status: STATUS.FAILED, message: "Token expired!" });
      }
      // 12 means 12 hours
      const expiration = new Date(new Date().getTime() + 12 * 60 * 60 * 1000);
      const apiTokenBody = {
        user_id: tokenVerify.user.id,
        type: "API",
        expire: expiration,
      };
      const apiToken: any = await TokenService.createToken(apiTokenBody);
      if (_.isEmpty(apiToken)) {
        return res.status(HTTP.UNAUTHORIZED).send({
          status: STATUS.FAILED,
          message: "Failed to create api token",
        });
      }
      const updateEmailToken = await TokenService.updateToken(tokenVerify.id, {
        valid: false,
      });
      if (_.isEmpty(updateEmailToken)) {
        return res
          .status(HTTP.UNPROCESSABLE_ENTITY)
          .send({ status: STATUS.FAILED, message: USER_RESPONSE.LOGIN_FAILED });
      }
      const generateJwtToken = await UserService.generateToken(
        apiToken.id,
        apiToken.user.email,
        apiToken.user.role
      );
      return res.send({
        status: STATUS.SUCCESS,
        message: USER_RESPONSE.LOGIN_SUCCESS,
        data: generateJwtToken,
      });
    } catch (err: any) {
      err.description = USER_RESPONSE.LOGIN_FAILED;
    }
  },
};
export default userController;
