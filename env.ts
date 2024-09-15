import { cleanEnv, num, str } from "envalid";

export const env = cleanEnv(process.env, {
  SESSION: str(),
  CHAT_ID: num(),
  KICK_PER_DAY: num({ default: 21 }),
});
