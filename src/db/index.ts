import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import * as dotenv from "dotenv";
import { UsersTable } from "../models";

dotenv.config();

// This interface contains all database tables
interface Database {
  users: UsersTable;
}

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      user: String(process.env.DB_USER),
      host: String(process.env.DB_HOST),
      database: String(process.env.DB_DATABASE),
      password: String(process.env.DB_PASSWORD),
      port: Number(process.env.DB_PORT),
    }),
  }),
});

export default db;
