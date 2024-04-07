import express from "express";
import { generatePdf } from "./core";
import { GeneratePdfQuerySchema, GetPdfQuerySchema, Status } from "./constant";
import { prisma } from "./prisma";

const app: express.Application = express();
const PORT = process.env.PORT ?? "3000";
const SITE_URL = process.env.SITE_URL ?? `http://localhost:${PORT}`;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/generate-pdf", async (req, res) => {
  const parsed = GeneratePdfQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid URL query parameter",
      data: null,
    });
  }
  const { url } = parsed.data;
  try {
    const data = await prisma.pdf.create({
      data: {
        status: Status.PENDING,
        url,
      },
    });
    res.json({
      message: "PDF generation started",
      data: data,
    });
    generatePdf(url, data.id.toString());
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occured",
      data: null,
    });
  }
});

app.get("/pdf/:id", async (req, res) => {
  const parsed = GetPdfQuerySchema.safeParse(req.params);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid ID parameter",
      data: null,
    });
  }
  const id = Number(parsed.data.id);
  try {
    const data = await prisma.pdf.findUnique({
      where: {
        id,
      },
    });
    if (!data) {
      return res.status(404).json({ message: "PDF not found", data: null });
    }
    res.json({
      message: "PDF found",
      data: data,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "An error occured",
      data: null,
    });
  }
});

app.get("/pdf/:id/download", (req, res) => {
  const parsed = GetPdfQuerySchema.safeParse(req.params);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid ID parameter",
      data: null,
    });
  }
  const id = Number(parsed.data.id);
  res.download(`./exported/${id}.pdf`);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${SITE_URL}`);
});
