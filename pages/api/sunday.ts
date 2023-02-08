import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs-extra";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const filePath = path.resolve(process.cwd(), "./sunday.json");
  if (req.method === "GET") {
    let result;
    try {
      result = await fs.readJson(filePath)
    } catch (err) {
      console.log(err);
      result = {};
    }
    res.status(200).json(result);
  } else if (req.method === "POST") {
    // Handle any other HTTP method
    await fs.ensureFile(filePath);
    await fs.writeJson(filePath, req.body);
    res.status(200).json(req.body);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
}
