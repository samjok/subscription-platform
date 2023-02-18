import { Generated, ColumnType } from "kysely";

export enum UserRoleEnum {
  ADMIN = "admin",
  USER = "user",
}

export type UserRole = `${UserRoleEnum}`;

export interface UsersTable {
  id: Generated<number>;
  first_name: string | null;
  last_name: string | null;
  username: string;
  password: string;
  email: string;
  role: UserRole;
  modified_at: ColumnType<Date, string | undefined, string>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type FetchedUserData = {
  id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
};
