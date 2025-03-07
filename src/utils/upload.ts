import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function saveImage(base64Image: string): Promise<string> {
  try {
    const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }

    const imageBuffer = Buffer.from(matches[2], 'base64');
    const fileExtension = matches[1].split('/')[1];
    const fileName = `${Date.now()}.${fileExtension}`;
    const uploadPath = join(process.cwd(), 'uploads');
    const filePath = join(uploadPath, fileName);

    await writeFile(filePath, imageBuffer);
    return `/uploads/${fileName}`;
  } catch (error) {
    throw new Error('Failed to save image');
  }
}
