//file: fbcookie.js

const axios = require('axios');

module.exports = {
  config: {
    name: 'fbcookie',
    aliases: ['cookie'],
    version: '0.0.1',
    credits: 'atomic-zero',
    role: 0,
    type: 'fb-credentials',
    info: 'get facebook cookie!',
    usage: '[email/uid] [password]',
    guide: 'fbcookie johnjoe@gmail.com @atomic0\ncookie 647282622728 @atomic0',
    cd: 10,
  },
  async onRun({ message, args }) {
    const uid = args[0];
    const password = args.slice(1).join(' ');

    if (!uid || !password) {
      message.reply(`Invalid Input!\nUsage: fbcookie [email/uid] [password]`);
      return;
    } else {
      message.reply("GETTING COOKIE....");
    }

    try {
      const userAgents = [
        "Mozilla/5.0 (Linux; Android 4.1.2; GT-I8552 Build/JZO54K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
        "Dalvik/2.1.0 (Linux; U; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.80 Mobile Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      ];
      const agent = userAgents[Math.floor(Math.random() * userAgents.length)];
      const response = await axios.post('https://atomic-zero.vercel.app/fbcookie', {
        username: uid,
        password: password,
        userAgent: agent
      });

      message.reply(response.data.cookies);
    } catch (error) {
      console.error("Error retrieving cookie:", error);
      message.reply("An error occurred while fetching the cookie.");
    }
  }
};
