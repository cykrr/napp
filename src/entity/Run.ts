import { Entity,PrimaryGeneratedColumn,ManyToOne,OneToMany,Column } from "typeorm";
import { User } from "./User";
import { Event } from "./Event";
@Entity()
export class Run {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    levelId!: number

    @Column()
    score!: number

    @Column()
    completed!: boolean

    @Column("float")
    time!: number

    @ManyToOne(() => User, user => user.runs)
    user!: User

    @OneToMany(() => Event, event => event.run)
    events!: Event[]
}