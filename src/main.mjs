import Eris from "eris";
import process from "process";
import Config from "./lib/Config.mjs";

import { guildID as TMinusGuildID, createMessage as createMessageTMinus } from "./guilds/TMinus.mjs"
import { guildID as JoyOdyssyGuildID, createMessage as createMessageJoyOdyssey } from "./guilds/JoyOdyssey.mjs"

const auth = new Config("auth")
const config = new Config("config")

export const roles = {
  // GTA
  "190946039467868160": {
    General: "866474005619015732",
    PC: "837974081844412436",
    PlayStation: "837974136058806272",
    Xbox: "837974126646788106",
    Events: "837986887372898315",
  },
  // Hip-Hop
  "229624492622610434": {
    General: "850976643400204328",
    Games: "279471597914685440",
    Showcase: "794424884775223327",
  },

  [TMinusGuildID]: {
    Producer: { id: "849697393686347814", row: 0, emoji: { name: "💽" } },
    Artist: { id: "849697393686347809", row: 0, emoji: { name: "🎤"} },
    Songwriter: { id: "849718239205785600", row: 0, emoji: { name: "📝" } },
    DJ: { id: "849718120776204338", row: 0, emoji: { name: "🎧" } },
    Management: { id: "849718240166543390", row: 1, emoji: { name: "👑" } },
    "A&R": { id: "849718396492841000", row: 1, emoji: { name: "💿" } },
  },

  [JoyOdyssyGuildID]: {
    Producer: { id: "913985103909236766", row: 0, emoji: { name: "👽" } },
    Musician: { id: "913985785525567498", row: 0, emoji: { name: "🎻" } },
    "Musical Artist": { id: "913985828454297661", row: 0, emoji: { name: "🦄" } },
    "Visual Artist": { id: "913985889401704489", row: 0, emoji: { name: "👁️" } },
    Writer: { id: "913985922201174056", row: 1, emoji: { name: "🩸" } },
    DJ: { id: "913985940446388274", row: 1, emoji: { name: "🌐" } },
    Management: { id: "913985967042490370", row: 1, emoji: { name: "🧩" } },
    "A&R": { id: "913985994754244668", row: 1, emoji: { name: "⛓️" } },
  },
}

function roleDataToID(data) {
  if (typeof data === "object") {
    return data.id;
  }
  return data;
}


async function main() {
  const bot = new Eris(auth.get("token"), { restMode: true, intents: 1 << 1 | 1 << 0 | 1 << 9 });

  function respond(id, token, body) {
    body.flags = 1 << 6
    return bot.requestHandler.request("POST", `/interactions/${id}/${token}/callback`, false, { type: 4, data: body });
  }

  bot.once("ready", async () => {
    // createMessageTMinus(bot);
    // createMessageJoyOdyssey(bot);
  })

  bot.on("rawWS", (packet) => {
    if (packet.t && packet.t === "INTERACTION_CREATE") {
      const data = packet.d;

      const guild = bot.guilds.get(data.guild_id);

      console.log(data.data);

      if (data.type === 1) {
        console.log("Got an Interaction Ping?");
      }

      if (data.type === 3) {
        const split = data.data.custom_id.includes("+") ? "+" : "-"
        const [command, roleName] = data.data.custom_id.split(split);

        if (command === "ban") {
          const memberIDs = roleName.split(",")

          for (let memberID of memberIDs) {
            guild.banMember(memberID, 1, "Mass Raid");
          }
          console.log(data.application_id, data.token);
          respond(data.id, data.token, {
            content: `You have Banned some members..`
          }).catch(console.error)

          bot.requestHandler.request("DELETE", `/interactions/${data.id}/${data.token}/messages/@original`, false).catch(error => console.error(error));

          guild.members.filter(member => member.joinedAt > (Date.now() - 1000 * 60 * 60)).filter(member => member.user.createdAt > Date(2021, 6, 17, 0, 0, 0, 0).getTime() && member.user.createdAt < Date(2021, 6, 18, 0, 0, 0, 0).getTime())


          Promise.all(guild.members
            .filter(member => member.joinedAt > (Date.now() - 1000 * 60 * 60))
            .filter(member => member.user.createdAt > new Date(2021, 6, 17, 0, 0, 0, 0).getTime() && member.user.createdAt < new Date(2021, 6, 18, 0, 0, 0, 0).getTime())
            .filter(m => m.user.avatar === null)
            .map(m => m.ban(7, "Mass Raid")))
        }

        if (command === "role") {
          if (!roles.hasOwnProperty(guild.id)) {
            return;
          }
          const roleID = roleDataToID(roles[guild.id][roleName]);

          if (split === "+") {
            guild.addMemberRole(data.member.user.id, roleID);
            respond(data.id, data.token, {
              content: `You gained the ${roleName} role`,
              components: [
                {
                  type: 1,
                  components: [{
                    type: 2,
                    style: 4,
                    label: `Remove ${roleName}`,
                    custom_id: `role-${roleName}`,
                  }]
                }
              ]
            }).catch(console.error)
          }

          if (split === "-") {
            guild.removeMemberRole(data.member.user.id, roleID);
            respond(data.id, data.token, {
              content: `You have removed the ${roleName} role successfully.`,
              components: [
                {
                  type: 1,
                  components: [{
                    type: 2,
                    style: 3,
                    label: `Re-add ${roleName}`,
                    custom_id: `role+${roleName}`,
                  }]
                }
              ]
            }).catch(console.error)
          }
        }
      }
    }
  })

  bot.on("error", console.error);
  bot.on("warn", console.error);

  bot.connect();
}

main();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
