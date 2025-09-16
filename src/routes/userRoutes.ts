import { Router, Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { Token } from "../entity/Token"
import { randomUUID } from "crypto"
import { auth } from "../middleware/auth"
import { Auth } from "typeorm";
import { RunData } from "../RunData";
import { Question, Run } from "../entity/Run";
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


router.put("/:id/runs", auth, async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id)
  if (id !== req.user?.id) return res.status(403).json({ error: "Not Allowed" })

  try {
    const { l, d, j, e, c, a, cc } = req.body as {
      l: string
      d: number
      j: number
      e: number
      c: number
      cc: number
      a: [number, number, number, number, number][]
    }

    const user = await AppDataSource.getRepository(User).findOneBy({ id })
    if (!user) return res.status(404).json({ error: "User not found" })

    const runRepo = AppDataSource.getRepository(Run)
    const questionRepo = AppDataSource.getRepository(Question)
    const eventRepo = AppDataSource.getRepository(Event)

    const run = runRepo.create({
      user, levelId: l, distance: d, jumps: j, errors: e, correct: c, completed: cc
    })
    await runRepo.save(run)

    if (a?.length) {
      const events = []
      for (let i = 0; i < a.length; i++) {
        const [qId, asId, fId, ansTime, ok] = a[i]

        // create Question only once per 4 rows (same qId)
        if (i % 4 === 0) {
          const question = questionRepo.create({
            run,
            excelQuestionId: qId,
            answerTime: ansTime,
          })
          await questionRepo.save(question)
        }

        events.push(eventRepo.create({
          assertionId: asId,
          formId: fId,
          isCorrect: !!ok,
        }))
      }
      await eventRepo.save(events)
    }

    return res.json({ status: "ok" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Server error" })
  }
})





// POST create user
router.post("/", async (req: Request<{}, {}, User>, res: Response) => {
  console.log("PUT")
  console.log(req.body)
  const user = userRepo.create(req.body)
  const saved = await userRepo.save(user)

  const tokenRepo = AppDataSource.getRepository(Token)
  const token = tokenRepo.create({ value: randomUUID(), user: saved })
  await tokenRepo.save(token)

  res.status(201).json({ user: saved, token: token.value })
})

export default router
