export const guildID = "913553478356455424";
export const channelID = "913553478549401633";

import { roles } from "../main.mjs";

export function createMessage(bot) {
  const guild = bot.guilds.get(guildID);

  const channel = guild.channels.get(channelID);

  channel.createMessage({
    embed: {
      title: "**Server Rules**",
      description: "**Server Rules**\n" +
        "Adhere to [Discord ToS](https://discord.com/terms) at all times.\n\n" +

        "Channel purpose can be found in each channel's description.\n\n" +

        "**What is Joy Odyssey?**\n" +
        "Joy Odyssey is a multi-dimensional experience created by me, Carlo \"[Illangelo](https://en.wikipedia.org/wiki/Illangelo#Full_discography)\" Montagnese.\n\n" +

        "In the past few months, I've been continuing to explore and embrace what the [metaverse](https://www.wired.com/story/what-is-the-metaverse/) is, and how to create cool projects within it.\n\n" +

        "More info soon on upcoming projects and new music drops. I look forward to connecting with all of you!\n\n" +

        "—Carlo\n\n" +

        "**I'm a creator. How do roles work?**\n" +
        "• Press the buttons listed below to acquire the corresponding roles.\n\n" +

        "**The buttons don't work, I didn't get my role!**\n" +
        "• If you do not see the buttons, reload your Discord app or client.\n" +
        "• If this doesn't work, update your client."
    }
  })

  channel.createMessage({
    "content": "\n**Announcement Channels**\n",
    "components": [
      {
        "type": 1,
        "components": [
          {
            type: 2,
            style: 5,
            label: "Announcements",
            url: "https://discord.com/channels/913553478356455424/915769396654379039/",
          },
          {
            type: 2,
            style: 5,
            label: "Socials",
            url: "https://discord.com/channels/913553478356455424/915769419878252594/",
          },
        ],
      }
    ]
  });

  channel.createMessage({
    "content": "­\n**Chat Channels**",
    "components": [
      {
        "type": 1,
        "components": [
          {
            type: 2,
            style: 5,
            label: "General",
            url: "https://discord.com/channels/913553478356455424/913553478549401639/",
          }, {
            type: 2,
            style: 5,
            label: "Showcase",
            url: "https://discord.com/channels/913553478356455424/913989740049625109/",
          },
        ]
      },
    ]
  });

  channel.createMessage({
    "content": "­\n**Creator Roles**",
    "components": [{
      "type": 1,
      "components":
        Object.entries(roles[guildID]).filter(([name, data]) => data.row === 0).map(([name, data]) => {
          console.log(name);
          return {
            type: 2,
            style: 3,
            label: `${name}`,
            custom_id: `role+${name}`,
            emoji: data.emoji,
          }
        }),
    }, {
      "type": 1,
      "components":
        Object.entries(roles[guildID]).filter(([name, data]) => data.row === 1).map(([name, data]) => {
          console.log(name);
          return {
            type: 2,
            style: 3,
            label: `${name}`,
            custom_id: `role+${name}`,
            emoji: data.emoji,
          }
        }),
    }]
  })
}
