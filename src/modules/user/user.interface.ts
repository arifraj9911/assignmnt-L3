import { USER_ROLE } from "./user.constant";

type TRole = "admin" | "user";

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: TRole;
};

export type TUserRole = keyof typeof USER_ROLE;
