import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Question, Run } from "./Run"

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number

  // @ManyToOne(() => Run, run => run.questions)
  // run!: Run

// Is Capitalized to differ from questionId which is used to identify the question
// being answered in the run saved on the database.
// This element "Question[Id]" represents the question's id in the json of
// questions.. Sorry for that :/.
  @ManyToOne(() => Question, question => question.events)
  question! : Question

  @Column()
  assertionId!: number

  @Column()
  formId!: number

  // Not really needed
  // @Column("float")
  // answerTime!: number

  @Column({ type: "boolean" })
  isCorrect!: boolean
}