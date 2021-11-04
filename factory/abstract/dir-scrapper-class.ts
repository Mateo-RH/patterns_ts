import fs, { readFileSync } from "fs";

abstract class DirectoryScraper {
  constructor(public dirPath: string) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>(
        (acc: Record<string, unknown>, file: string) => {
          if (this.isJSON(file)) {
            acc[file] = this.readJSON(`${this.dirPath}/${file}`);
          } else {
            acc[file] = this.readText(`${this.dirPath}/${file}`);
          }
          return acc;
        },
        {}
      );
  }

  abstract isJSON(file: string): boolean;
  abstract readText(file: string): string;
  abstract readJSON(file: string): unknown;
}

class FileReader extends DirectoryScraper {
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

const fileReader = new FileReader("./data");
const output = fileReader.scanFiles();

console.log(output);
