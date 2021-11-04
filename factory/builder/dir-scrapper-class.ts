import fs, { readFileSync } from "fs";

interface IFileReader {
  isJSON(file: string): boolean;
  readText(file: string): string;
  readJSON(file: string): unknown;
}

class DirectoryScraper {
  constructor(public dirPath: string, public fileReader: IFileReader) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>(
        (acc: Record<string, unknown>, file: string) => {
          if (this.fileReader.isJSON(file)) {
            acc[file] = this.fileReader.readJSON(`${this.dirPath}/${file}`);
          } else {
            acc[file] = this.fileReader.readText(`${this.dirPath}/${file}`);
          }
          return acc;
        },
        {}
      );
  }
}

class FileReader implements IFileReader {
  isJSON(file: string): boolean {
    return file.endsWith(".json");
  }

  readText(file: string): string {
    return readFileSync(file, "utf8").toString();
  }

  readJSON(file: string): string {
    return JSON.parse(readFileSync(file, "utf8").toString());
  }
}

const fileReader = new FileReader();
const dirScraper = new DirectoryScraper("./data", fileReader);
const output = dirScraper.scanFiles();

console.log(output);
