import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await kv.set("wheel-entries", []);
    res.status(200).json({ status: "cleared" });
  } else {
    res.status(405).end();
  }
}
