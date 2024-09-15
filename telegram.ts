import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import { env } from "./env.js";
import { EntityLike } from "telegram/define.js";

export class Telegram extends TelegramClient {
  constructor(session: string) {
    super(new StringSession(session), 12345, "abcdf", {});
  }

  async launch() {
    await this.start({ botAuthToken: "" });
  }

  async get(filter: Api.TypeChannelParticipantsFilter) {
    const result: Api.User[] = [];

    for await (const user of this.iterParticipants(env.CHAT_ID, { filter })) {
      result.push(user);
    }
    return result;
  }

  async getMembers() {
    const admins = await this.get(new Api.ChannelParticipantsAdmins());
    const adminIds = admins.map((admin) => admin.id.toJSNumber());
    const users = await this.get(new Api.ChannelParticipantsRecent());
    const members = users.filter((u) => !adminIds.includes(u.id.toJSNumber()));

    return members;
  }

  async kick(user: EntityLike) {
    await this.kickParticipant(env.CHAT_ID, user);
  }
}
