import axios from "axios";

export const config = {
  name: "claude",
  author: "AkhiroDEV | Rui",
  usePrefix: false,
  description: "Talk to Claude",
  usage: "{pn} [query]"
},
  
export async function onRun({ 
  message: box,
  args 
}) {
    const query = args.join(" ");
    if (!query) {
      box.react("ℹ️");
      return box.send(`ℹ️ | Please provide a message`);
    }
    try {
      box.send(`Please wait..`);
      const response = await axios.get(`https://hashier-api-claude.vercel.app/api/claude?ask=${encodeURIComponent(query)}`);
      const answer = response.data.response;
      box.edit(`${answer}`);
    } catch (error) {
      console.log(error);
      box.react("🔴");
      box.send(`ERROR: ${error.message}`);
  }
}
