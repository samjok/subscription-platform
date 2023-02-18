import { Router } from "express";
import { loginController } from "../controllers/loginController";

export default function login(): Router {
  const router = Router();
  router.post("/", loginController);
  return router;
}
