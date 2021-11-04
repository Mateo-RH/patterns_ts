import fs, { readFileSync } from "fs";

interface IFileReader {
  isJSON(file: string): boolean;
  readText(file: string): string;
  readJSON(file: string): unknown;
}

const directoryScraper = (dirPath: string, fileReader: IFileReader) => {
  return fs
    .readdirSync(dirPath)
    .reduce<Record<string, unknown>>(
      (acc: Record<string, unknown>, file: string) => {
        if (fileReader.isJSON(file)) {
          acc[file] = fileReader.readJSON(`${dirPath}/${file}`);
        } else {
          acc[file] = fileReader.readText(`${dirPath}/${file}`);
        }
        return acc;
      },
      {}
    );
};

const fileReader: IFileReader = {
  isJSON(file: string): boolean {
    return file.endsWith(".json");
  },

  readText(file: string): string {
    return readFileSync(file, "utf8").toString();
  },

  readJSON(file: string): string {
    return JSON.parse(readFileSync(file, "utf8").toString());
  },
};

const output = directoryScraper("./data", fileReader);

console.log(output);
