import ImageKit, { toFile } from "@imagekit/nodejs";
import config from "../config/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_SECRET_KEY,
});

const uploadFile = async (files) => {
  return await Promise.all(
    files.map(async (file) =>
      client.files.upload({
        file: await toFile(file.buffer),
        fileName: file.originalname,
        folder: "StoreAPI",
      }),
    ),
  );
};

export const deleteUploadedFile = async (files) => {
  return await Promise.all(
    files.map(async (file) => await client.files.delete(file.fileId)),
  );
};

export default uploadFile;
