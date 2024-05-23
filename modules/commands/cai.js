const axios = require("axios");
const models = [
  "gpt-4",
  "gpt-4-0613",
  "gpt-4-32k",
  "gpt-4-0314",
  "gpt-4-32k-0314",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "gpt-3.5-turbo-0613",
  "gpt-3.5-turbo-16k-0613",
  "gpt-3.5-turbo-0301",
  "text-davinci-003",
  "text-davinci-002",
  "code-davinci-002",
  "gpt-3",
  "text-curie-001",
  "text-babbage-001",
  "text-ada-001",
  "davinci",
  "babbage",
  "curie",
  "ada",
  "babbage-002",
  "davinci-002"
];

module.exports = {
  config: {
    name: "cai",
    version: "0.0.1",
    author: "atomic-zero",
    role: 0,
    description: "artificial-intelligence",
    usePrefix: false,
    usage: "[prompt]",
    guide: "cai write me a story",
    cd: 6
  },
  async onRun({ message, args, event }) {
    const { senderID } = event;
    const text = args.join(" ");

    if (!text) {
      message.reply("Please provide a text!");
      return;
    }

    const keywords = ["forget", "reset", "clear", "forgot"].includes(
      text.toLowerCase()
    );

    for (let model of models) {
      try {
        const response = await axios.post(
          "https://atomic-zero.vercel.app/chat-request",
          {
            model: model,
            chatID: senderID,
            prompt: keywords ? "" : text,
            reset: keywords
          }
        );

        const { answer, message: responseMessage, audio } = response.data;

        if (keywords) {
          message.reply(responseMessage);
        } else {
          message.reply(answer);
        }

        if (audio) {
          try {
            const audioResponse = await axios.get(audio, {
              responseType: "stream"
            });
            await message.reply({
              body: "💽 Voice Message",
              attachment: audioResponse.data
            });
          } catch (audioError) {
            console.error("Error fetching audio:", audioError);
          }
        }
        return;
      } catch (error) {
        console.error(`Error with model ${model}:`, error);
      }
    }

    message.reply("No response. Try again later.");
  }
};
