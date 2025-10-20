import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const KEY = "wheel-entries";
  if (req.method === "GET") {
    const entries = await kv.get(KEY) || [];
    res.status(200).json(entries);
  } else if (req.method === "POST") {
    const { name, amount } = req.body;
    if (!name || !amount) return res.status(400).json({ error: "Missing name or amount" });
    let entries = (await kv.get(KEY)) || [];
    for (let i = 0; i < amount; i++) entries.push(name);
    await kv.set(KEY, entries);
    res.status(200).json(entries);
  }
}
