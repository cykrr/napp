import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import * as dotenv from "dotenv"
import { Token } from "./entity/Token";
import { Run,Question
  // ,Assertion 
} from "./entity/Run";
import { Event } from "./entity/Event";

dotenv.config()

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "mydb",
  synchronize: true,
  logging: false,
    extra: {
    max: 50,   // maximum number of connections in pool
    idleTimeoutMillis: 30000, // close idle clients after 30s
  },
  entities: [User, Token, Run, Question, Event  /* Assertion */ ],
})