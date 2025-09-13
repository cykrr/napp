import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {  Token } from "./Token";
import { Run } from "./Run"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    email!: string
    
    @OneToMany(() => Token, token => token.user)
    tokens!: Token[]

    @OneToMany(() => Run, run => run.user)
    runs!: Run[]

    @Column({ type: "boolean", default: false })
    level1!: boolean

    @Column({ type: "boolean", default: false })
    level2!: boolean

    @Column({ type: "boolean", default: false })
    level3!: boolean
    // @Column()
    // highScore!: number
}
