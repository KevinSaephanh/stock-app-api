import { Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import config from '../config/config';
import { ApiError } from '../utils/apiError';

export class TokenService {
  signAccessToken = (id: number) => {
    return sign({ id }, config.auth.accessTokenSecret, {
      expiresIn: config.auth.accessTokenExpiresIn,
    });
  };

  signRefreshToken = (id: number) => {
    return sign({ id }, config.auth.refreshTokenSecret, {
      expiresIn: config.auth.refreshTokenExpiresIn,
    });
  };

  signTokens = (id: number, res: Response) => {
    const accessToken = this.signAccessToken(id);
    const refreshToken = this.signRefreshToken(id);
    this.setRefreshToken(refreshToken, res);
    return { accessToken, refreshToken };
  };

  setRefreshToken = (token: string, res: Response) => {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: config.env === 'production',
      path: '/',
    });
  };

  verifyToken = (token: string, jwtType: 'access' | 'refresh' | 'email') => {
    try {
      const { accessTokenSecret, refreshTokenSecret, emailTokenSecret } = config.auth;
      switch (jwtType) {
        case 'access':
          return verify(token, accessTokenSecret);
        case 'refresh':
          return verify(token, refreshTokenSecret);
        case 'email':
          return verify(token, emailTokenSecret);
        default:
          return;
      }
    } catch (err) {
      throw new ApiError(401, 'Unauthorized!');
    }
  };

  createEmailToken = (id: string) => {
    return sign({ id }, config.auth.emailTokenSecret, {
      expiresIn: config.auth.emailTokenExpiresIn,
    });
  };

  clearTokens = (res: Response) => {
    res.cookie('refresh_token', '', { maxAge: 1 });
  };
}
