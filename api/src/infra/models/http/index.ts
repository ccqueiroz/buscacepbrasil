import { Request, Response, NextFunction } from 'express';

export interface RequestInfra extends Request {
  ipControll?: string;
}

export type ResponseInfra = Response;
export type NextFunctionInfra = NextFunction;
