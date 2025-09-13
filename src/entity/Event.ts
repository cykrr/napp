import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Run } from "./Run"

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Run, run => run.events)
  run!: Run

  @Column()
  questionId!: number

  @Column()
  assertionId!: number

  @Column()
  formId!: number

  @Column("float")
  answerTime!: number

  @Column({ type: "boolean" })
  isCorrect!: boolean
}