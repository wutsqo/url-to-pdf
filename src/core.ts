import puppeteer from "puppeteer";
import * as fs from "fs";
import { prisma } from "./prisma";
import { Status } from "./constant";

export async function generatePdf(url: string, id: string) {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    fs.writeFileSync(`./exported/${id}.pdf`, pdf);
    await prisma.pdf.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: Status.SUCCESS,
      },
    });
    await browser.close();
  } catch (error) {
    if (browser) await browser.close();
    await prisma.pdf.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: Status.FAILED,
      },
    });
    console.error(error);
  }
}
