module.exports = {
  config: {
    name: 'ai5',
    version: '1.1.1',
    role: 0,
    author: 'hazey_api',
    description: 'An AI powered Antarctic',
    usePrefix: false,
    usage: '[prompt]',
    cooldown: 0,
  },
  async onRun({ api, event, args }) {
    const axios = require('axios');

    function formatFont(text) {
      const fontMapping = {
        a: '𝚊', b: '𝚋', c: '𝚌', d: '𝚍', e: '𝚎', f: '𝚏', g: '𝚐', h: '𝚑', i: '𝚒', j: '𝚓', k: '𝚔', l: '𝚕', m: '𝚖',
        n: '𝚗', o: '𝚘', p: '𝚙', q: '𝚚', r: '𝚛', s: '𝚜', t: '𝚝', u: '𝚞', v: '𝚟', w: '𝚠', x: '𝚡', y: '𝚢', z: '𝚣',
        A: '𝙰', B: '𝙱', C: '𝙲', D: '𝙳', E: '𝙴', F: '𝙵', G: '𝙶', H: '𝙷', I: '𝙸', J: '𝙹', K: '𝙺', L: '𝙻', M: '𝙼',
        N: '𝙽', O: '𝙾', P: '𝙿', Q: '𝚀', R: '𝚁', S: '𝚂', T: '𝚃', U: '𝚄', V: '𝚅', W: '𝚆', X: '𝚇', Y: '𝚈', Z: '𝚉',
      };

      return text.split('').map((char) => fontMapping[char] || char).join('');
    }

    let user = args.join(' ');

    try {
      if (!user) {
        api.setMessageReaction("❓")
        return api.sendMessage('❓ | Please provide a question first!', event.threadID, event.messageID);
      }

      const loading = await api.sendMessage('🔍 | Searching Please Wait....', event.threadID);
      const response = await axios.get(`https://haze-llm-model-74e9fe205264.herokuapp.com/api/chat?content=${encodeURIComponent(user)}`);

      const responseData = response.data;
      const content = formatFont(responseData.choices[0].message.content);
      const baby = `🤖 | 𝗚𝗣𝗧𝟰 𝗔𝗜 ━━━━━━━━━━━━━━━\n\n🖋️ 𝗔𝗻𝘀𝘄𝗲𝗿: '${content}`;
      
      api.editMessage(baby, loading.messageID);
    } catch (err) {
      console.error(err);
      return api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    }
  }
};
