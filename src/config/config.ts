import 'dotenv/config';

export default {
  env: process.env['NODE_ENV']!,
  port: +process.env['PORT']! || 8000,
  web: {
    baseUrl: process.env['WEB_BASEURL'] ?? 'http://localhost:4200',
  },
  auth: {
    accessTokenSecret: process.env['ACCESS_TOKEN_SECRET']!,
    refreshTokenSecret: process.env['REFRESH_TOKEN_SECRET']!,
    emailTokenSecret: process.env['EMAIL_TOKEN_SECRET']!,
    accessTokenExpiresIn: process.env['ACCESS_TOKEN_EXPIRES_IN']!,
    refreshTokenExpiresIn: process.env['REFRESH_TOKEN_EXPIRES_IN']!,
    emailTokenExpiresIn: process.env['EMAIL_TOKEN_EXPIRES_IN']!,
    saltRounds: +process.env['SALT_ROUNDS']!,
  },
  mongoose: {
    url: process.env['MONGODB_URL']!,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  email: {
    username: process.env['EMAIL_USERNAME']!,
    password: process.env['EMAIL_PASSWORD']!,
  },
};
