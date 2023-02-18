import { Router } from "express";
import login from "./login";

export const createRoutes = (): Router => {
  const router = Router();
  router.use("/login", login());
  return router;
};
