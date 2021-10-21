export const guildID = "849697393661968455";
export const channelID = "849697394195169336";

import { roles } from "../main.mjs";

export function createMessage(bot) {
  const guild = bot.guilds.get(guildID);

  const channel = guild.channels.get(channelID);

  channel.createMessage({
    embed: {
      title: "**Server Rules**",
      description: "**Server Rules**\n" +
        "Adhere to [Discord ToS](https://discord.com/terms) at all times.\n" +
        "\n" +
        "**How do I submit a beat?**\n" +
        "Read the **Beat Submissions** section below, for more information.\n" +
        "\n" +
        "**I submitted a beat. When will T-Minus play my beat on stream?**\n" +
        "There is no guarantee that your beat will be played. However, if you'd like to find out, tune into his Twitch broadcast when it is live. \n" +
        "\n" +
        "**What else happens with my beat?**\n" +
        "Depending on if it's selected by T-Minus, it may be highlighted or shared with other artists for potential placement. T-Minus will be in touch with you directly with relevant updates, if there are any.\n" +
        "\n" +
        "**Leaks**\n" +
        "You may discuss them. You may not link nor suggest where to acquire them.\n" +
        "\n" +
        "**I'm a [type of creator]. How do creator roles work?**\n" +
        "• Press the role buttons listed below to acquire the corresponding creator roles.\n" +
        "\n" +
        "**The buttons don't work, I didn't get my role!**\n" +
        "• If you do not see the buttons, please reload your Discord app or client.\n" +
        "• If this doesn't work, please update your client."
    }
  })

  channel.createMessage({
    "content": "**Beat Submissions**\n" +
      "Check channel topic for the password!\n",
    "components": [
      {
        "type": 1,
        "components": [
          {
            type: 2,
            style: 5,
            label: "Submit",
            url: "https://tminusmusic.com/discord",
          },
        ],
      }
    ]
  });

  channel.createMessage({
    "content": "­\n**Announcement Channels**",
    "components": [
      {
        "type": 1, // Announcements | News | Pop | Culture | Discover
        "components": [
          {
            type: 2,
            style: 5,
            label: "Server",
            url: "https://discord.com/channels/849697393661968455/849697394458886147/",
          }, {
            type: 2,
            style: 5,
            label: "Twitch",
            url: "https://discord.com/channels/849697393661968455/849697394195169339/",
          },
        ]
      },
    ]
  });

  channel.createMessage({
    "content": "­\n**General**",
    "components": [
      {
        "type": 1,
        "components": [{
          type: 2,
          style: 5,
          label: "Chat",
          url: "https://discord.com/channels/849697393661968455/849697394458886149/",
        }, {
          type: 2,
          style: 5,
          label: "Lounge",
          url: "https://discord.com/channels/849697393661968455/867164150765584385/",
        }]
      }
    ]
  })

  channel.createMessage({
    "content": "­\n**Production**",
    "components": [
      {
        "type": 1,
        "components": [{
          type: 2,
          style: 5,
          label: "Beats",
          url: "https://discord.com/channels/849697393661968455/849727694559379467/",
        }, {
          type: 2,
          style: 5,
          label: "Loops",
          url: "https://discord.com/channels/849697393661968455/849728108277530644/",
        }, {
          type: 2,
          style: 5,
          label: "Showcase",
          url: "https://discord.com/channels/849697393661968455/849697394697306113/",
        }]
      }
    ]
  });

  channel.createMessage({
    "content": "­\n**What kind of creator are you?**",
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
