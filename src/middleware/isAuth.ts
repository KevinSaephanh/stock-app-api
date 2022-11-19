import type { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config/config';
import { ApiError } from '../utils/apiError';
import { asyncWrap } from './asyncWrap';

export const isAuth = asyncWrap(async (req: Request, _res: Response) => {
  let token = req.headers['authorization'];
  token = token?.split(' ')?.[1];

  if (token === undefined) throw new ApiError(403, 'No token provided!');

  try {
    verify(token, config.auth.accessTokenSecret);
  } catch (err) {
    throw new ApiError(401, 'Unauthorized!');
  }
});
