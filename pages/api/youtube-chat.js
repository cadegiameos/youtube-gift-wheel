import axios from "axios";
import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const KEY = "wheel-entries";
  const LAST_FETCH_KEY = "last-fetched-message-id";
  const LIVE_CHAT_ID = process.env.LIVE_CHAT_ID;
  const API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${LIVE_CHAT_ID}&part=snippet,authorDetails&key=${API_KEY}`
    );

    const messages = response.data.items || [];
    let entries = (await kv.get(KEY)) || [];
    const lastFetchedId = (await kv.get(LAST_FETCH_KEY)) || "";

    const regex = /([\w\s]+?)\s+has gifted\s+(\d+)\s+memberships/gi;

    for (const msg of messages) {
      if (msg.id === lastFetchedId) break;

      const text = msg.snippet.displayMessage;
      let match;
      while ((match = regex.exec(text)) !== null) {
        const user = match[1].trim();
        const amount = parseInt(match[2]);
        for (let i = 0; i < amount; i++) entries.push(user);
      }
    }

    if (messages.length > 0) {
      await kv.set(LAST_FETCH_KEY, messages[0].id);
    }

    await kv.set(KEY, entries);
    res.status(200).json({ added: true, total: entries.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
}
