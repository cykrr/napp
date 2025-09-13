// src/middleware/auth.ts
import { AppDataSource } from "../data-source"
import { Token } from "../entity/Token"
import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";

// custom type for later use
export interface AuthRequest extends Request {
  user?: User
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  const value = req.headers["x-api-key"] as string
  if (!value) return res.status(401).json({ error: "No token" })
    
  const tokenRepo = AppDataSource.getRepository(Token)
  const token = await tokenRepo.findOne({
    where: { value },
    relations: ["user"],
  })

  if (!token) {
    return res.status(403).json({ error: "Invalid token" })
  }
  (req as AuthRequest).user = token.user
  console.log("auth end")
  next()
}
