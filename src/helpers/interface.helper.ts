import { Request, Response, NextFunction } from "express";

export interface IRequest extends Request {
  decoded: IDecoded;
}

export type IResponse = Response;

export type INextFunction = NextFunction;

export interface IDecoded {
  id: number;
  email?: string;
  role: string;
}

export interface IUser {
  id?: number;
  email: string;
  role?: any;
}

export interface ICreateUser {
  email: string;
}

export interface IUpdateUser {
  email?: string;
  role?: any;
}

export interface IUserQuery {
  id: number;
  email?: string;
}

export interface IUserList {
  docs?: Array<object>;
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  skip?: number;
}
export interface IUserListQuery {
  email?: object;
  is_deleted?: boolean;
}

export interface IUserArray {
  id: number;
  email: string;

  role?: string;
}

export interface IPaginationOption {
  skip: number;
  limit: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sort?: any;
}
