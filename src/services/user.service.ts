import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import {
  ICreateUser,
  IUser,
  IUserQuery,
  IUpdateUser,
} from "../helpers/interface.helper";

const prisma = new PrismaClient();

const UserService = {
  userDetails: async (id: number, email?: string): Promise<IUser> => {
    let query = {};
    if (id) query["id"] = id;
    if (email) query["email"] = email;
    // @ts-ignore
    const user: IUser = await prisma.user.findUnique({ where: query });
    return user;
  },

  updateUser: async (
    query: IUserQuery,
    update: IUpdateUser
  ): Promise<IUser> => {
    const updateUser = await prisma.user.update({ where: query, data: update });
    return updateUser;
  },

  generateToken: async (id: string, email: string, role: string) => {
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;
    let token = jwt.sign(
      { exp: expiry, data: { id: id, email: email, role: role } },
      process.env.SECRET
    );
    token = "Bearer " + token;
    return token;
  },

  createUser: async (data: ICreateUser): Promise<IUser> => {
    const user = await prisma.user.create({ data });
    return user;
  },
};

export default UserService;
