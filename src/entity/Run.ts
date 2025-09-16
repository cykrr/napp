import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Event } from "./Event"
import { User } from "./User";

@Entity()
export class Run {
  @PrimaryGeneratedColumn()
  id!: number


  @Column()
  levelId!: string

  @Column()
  distance!: number

  @Column()
  jumps!: number

  @Column()
  errors!: number

  @Column()
  correct!: number

  @Column()
  completed!: number

  @ManyToOne(() => User, u => u.runs)
  user!: User

  @OneToMany(() => Question, q => q.run, { cascade: true })
  questions!: Question[]

}
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Run, run => run.questions)
  run!: Run

  @Column()
  excelQuestionId!: number

  @Column("float")
  answerTime!: number

  @OneToMany(() => Event, a => a.question, { cascade: true })
  events!: Event[]
}

// @Entity()
// export class Assertion {
//   @PrimaryGeneratedColumn()
//   id!: number

//   @ManyToOne(() => Question, q => q.assertions)
//   question!: Question

//   @Column()
//   formId!: number

//   @Column()
//   correct!: boolean
// }