import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  node: process.env.NODE,
  salts_password:process.env.PASSWORD_SALTS_ROUND,
  access_token_secret:process.env.JWT_ACCESS_TOKEN_SECRET_KEY
};
