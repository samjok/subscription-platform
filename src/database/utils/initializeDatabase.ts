import { Kysely, sql } from "kysely";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { UserRoleEnum } from "../../models/Users";
import { Message } from "../../types";

dotenv.config();

export async function createUserTable(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("users")
    .ifNotExists()
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

export async function createAdmin(db: Kysely<any>): Promise<boolean> {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const email = process.env.ADMIN_EMAIL;

  if (!password || !username || !email)
    throw new Error("Environmental variables for the admin are missing.");

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
  return Boolean(id);
}

export async function checkIsAdminCreated(db: Kysely<any>): Promise<boolean> {
  const result = await db
    .selectFrom("users")
    .selectAll()
    .where("role", "=", UserRoleEnum.ADMIN)
    .executeTakeFirst();
  return Boolean(result);
}

export async function initializeDatabase(db: Kysely<any>): Promise<Message> {
  try {
    await createUserTable(db);
    const isAdmin = await checkIsAdminCreated(db);
    if (isAdmin) {
      return {
        success: true,
        msg: "Server is connected to PostgreSQL database.",
      };
    } else {
      const isAdminCreated = await createAdmin(db);
      if (isAdminCreated) {
        return {
          success: true,
          msg: "Server is connected to PostgreSQL database. Admin user created.",
        };
      } else {
        throw new Error("Failed to create admin user.");
      }
    }
  } catch (error) {
    return {
      success: false,
      msg: "Error occured when trying to initialize database.",
      error,
    };
  }
}
