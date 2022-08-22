declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    PORT: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRES_IN: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
    VERIFY_EMAIL_TOKEN_EXPIRES_IN: string;
    SALT_ROUNDS: string;
    MONGODB_URL: string;
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
    EMAIL_FROM: string;
  }
}
