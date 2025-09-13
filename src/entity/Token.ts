// entity/Token.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  value!: string

  @ManyToOne(() => User, user => user.tokens, { onDelete: "CASCADE" })
  user!: User
}
