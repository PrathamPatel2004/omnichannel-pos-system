import { IUser } from "../models/user.model.ts";
import "express";

interface JwtUserPayload {
  id: string;
  role: "admin" | "manager" | "cashier";
}

declare module "express-serve-static-core" {
    interface Request {
        user?: JwtUserPayload;
    }
}