const axios = require('axios');

module.exports = {
config: {
  name: 'fbshield',
  version: '1.0.0',
  role: 0,
  author: 'atomic zero',
  description: "fbshield",
  cooldown: 5,
  usage: '[token]',
},

async onRun({ message, event, args }){
  const userToken = args[0];

  if (!userToken) {
    return message.reply('Please provide a valid Facebook token.', event.threadID, event.messageID);
  }

  axios.get(`https://atomic-zero.vercel.app/fbshield?token=${userToken}`)
    .then(response => {
      message.reply(JSON.stringify(response.data), event.threadID);
    })
    .catch(error => {
      console.error(error.message);
      message.reply('Failed to turn on the avatar shield.', event.threadID);
    });
}
};
