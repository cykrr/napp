import { Router, Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { Token } from "../entity/Token"
import { randomUUID } from "crypto"
import { auth } from "../middleware/auth"
import { Auth } from "typeorm";
import { RunData } from "../RunData";
import { Run } from "../entity/Run";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata.js";
import {Event} from "../entity/Event"

const router = Router()
const userRepo = AppDataSource.getRepository(User)

// GET all users
router.get("/", async (req, res) => {
  const users = await userRepo.find()
  res.json(users)
})

export interface AuthRequest extends Request {
  user?: User
}

router.put("/:id/runs", auth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  console.log(id, req.user)
  if (id !== req.user?.id) {
    return res.status(403).json({error: "Not Allowed"})
  }
  try {
    const data = req.body as RunData
    const userRepo = AppDataSource.getRepository(User);
    const runRepo = AppDataSource.getRepository(Run);
    const eventRepo = AppDataSource.getRepository(Event);

    const user = await userRepo.findOneBy({ id })
    if (!user) return res.status(404).json({error: "User not found"})

    const run = runRepo.create({
      user,
      levelId: data.l,
      score: data.s,
      completed: data.c,
      time: data.t,
      events: [],
    })

    await runRepo.save(run);
    const events = data.a.map(([questionId, assertionId, formId, answerTime, isCorrect ]) => 
      eventRepo.create({
        run, 
        questionId,
        assertionId,
        formId,
        answerTime,
        isCorrect: !!isCorrect,

      })
    );
    console.log(events)
    await eventRepo.save(events);


  } catch (err) {
      console.log(err)
  }
  return res.status(200).json({status: "ok"})
})



// POST create user
router.post("/", async (req: Request<{}, {}, User>, res: Response) => {
  console.log("POST")
  console.log(req.body)
  const user = userRepo.create(req.body)
  const saved = await userRepo.save(user)

  const tokenRepo = AppDataSource.getRepository(Token)
  const token = tokenRepo.create({ value: randomUUID(), user: saved })
  await tokenRepo.save(token)

  res.status(201).json({ user: saved, token: token.value })
})

export default router
