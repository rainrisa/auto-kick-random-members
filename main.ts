import "dotenv/config";
import _ from "lodash";
import { Telegram } from "./telegram.js";
import { env } from "./env.js";

const client = new Telegram(env.SESSION);
await client.launch();

const members = await client.getMembers();
const shuffledMembers = _.shuffle(members);
const kickPerDay = env.KICK_PER_DAY;
const targetMembers = shuffledMembers.slice(0, kickPerDay);

for (const member of targetMembers) {
  await client.kick(member);
  console.log("Kicked", member.firstName);
}
process.exit();
