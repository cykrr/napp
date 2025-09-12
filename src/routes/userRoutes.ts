import { Router } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

const router = Router()
const userRepo = AppDataSource.getRepository(User)

// GET all users
router.get("/", async (req, res) => {
  const users = await userRepo.find()
  res.json(users)
})

// POST create user
router.post("/", async (req, res) => {
  const user = userRepo.create(req.body)
  const result = await userRepo.save(user)
  res.status(201).json(result)
})

export default router
