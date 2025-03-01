import fs from 'fs';

export const readJsonFile = <T>(filePath: string): T => {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData) as T;
};
