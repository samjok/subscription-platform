import { Kysely, sql } from "kysely";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { UserRoleEnum } from "../../models/Users";

dotenv.config();

export async function initializeDatabase(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("username", "varchar", (col) => col.notNull().unique())
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar(50)", (col) => col.notNull().unique())
    .addColumn("first_name", "varchar")
    .addColumn("last_name", "varchar")
    .addColumn("role", "varchar(50)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("modified_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function initializeAdmin(
  db: Kysely<any>
): Promise<any | undefined> {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const email = process.env.ADMIN_EMAIL;

  if (!password || !username || !email) return;

  const salt = await bcrypt.genSalt(10);
  const cryptedPassword = await bcrypt.hash(password, salt);
  const { id } = await db
    .insertInto("users")
    .values({
      username,
      password: cryptedPassword,
      email,
      role: UserRoleEnum.ADMIN,
    })
    .returning("id")
    .executeTakeFirstOrThrow();
  return id;
}

export async function checkUsers(db: Kysely<any>): Promise<any> {
  const result = await db
    .selectFrom("users")
    .selectAll()
    .where("role", "=", UserRoleEnum.ADMIN)
    .executeTakeFirst();
  return result;
}
