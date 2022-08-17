import * as express from "express";
import { AuthRouter } from "./auth.routes";
import { UserRouter } from "./user.routes";

export const routes = (server: express.Application) => {
  const prefix = "/api/v1"; // If needed
  server.use("/user", new UserRouter().router);
  server.use("/auth", new AuthRouter().router);
};
