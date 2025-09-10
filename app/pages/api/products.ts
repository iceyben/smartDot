import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { prisma } from "@/prisma/client";

export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "Error parsing form" });

      const imageField = files.image;
      const file =
        Array.isArray(imageField) ? imageField[0] : imageField;
      if (!file || !fields.title || !fields.price)
        return res.status(400).json({ error: "Missing required fields" });

      const imageUrl = `/uploads/${file.newFilename}`;

      const product = await prisma.product.create({
        data: {
          title: Array.isArray(fields.title) ? fields.title[0] : (fields.title as string),
          description: Array.isArray(fields.description)
            ? fields.description[0] ?? ""
            : (fields.description ?? "") as string,
          price: parseFloat(Array.isArray(fields.price) ? fields.price[0] : (fields.price as string)),
          imageUrl,
        },
      });

      return res.status(201).json(product);
    });
  } else if (req.method === "GET") {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(products);
  }
}
