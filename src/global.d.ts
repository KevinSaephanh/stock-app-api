declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      [key: string]: string | undefined;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
