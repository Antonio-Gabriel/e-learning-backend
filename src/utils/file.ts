import fs from "fs";

export async function deleteFile(filename: string) {
  try {
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  await fs.promises.unlink(filename);
}
