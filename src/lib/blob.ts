import { put } from '@vercel/blob/client';

export const uploadImageToBlob = async (file: File): Promise<string> => {
  try {
    const blob = await put(file.name, file, {
      access: 'public',
    });
    return blob.url;
  } catch (error) {
    console.error('Error uploading image to Blob:', error);
    throw error;
  }
};
