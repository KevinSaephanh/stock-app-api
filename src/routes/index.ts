import * as express from "express";
import { UserRouter } from "./user.routes";

export const routes = (server: express.Application) => {
  server.use("/user", new UserRouter().router);
};
