import ImageKit, { toFile } from "@imagekit/nodejs";
import config from "../config/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_SECRET_KEY,
});

export async function uploadFile(files) {
  const response = await Promise.all(
    files.map(async (file) =>
      client.files.upload({
        file: await toFile(file.buffer),
        fileName: file.originalname,
        folder: "snitch",
      }),
    ),
  );

  return response;
}
