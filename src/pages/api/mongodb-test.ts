import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.command({ ping: 1 });

    res.status(200).json({ ok: true, result });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as Error).message });
  }
}
