import { readFileSync, writeFile, writeFileSync } from "fs";

export enum DataStores {
  USER = "user",
  CHANNEL = "channel",
}

export class GenericStore<T> {
  storeFileName: string;
  constructor(
    private readonly store: DataStores,
    private readonly uniqueIdentifier: string,
    private readonly resourceName: string
  ) {
    this.storeFileName = `src/datastore/${this.store}.json`;
  }
  readFullStore = async () => {
    const data: T[] = await JSON.parse(
      readFileSync(this.storeFileName, "utf8")
    );
    return data;
  };

  getEntry = async (identifer: string) => {
    const data: T[] = await JSON.parse(
      readFileSync(this.storeFileName, "utf8")
    );
    const entry = data.find((e) => e[this.uniqueIdentifier] === identifer);
    return entry;
  };

  createEntry = async (data: T) => {
    const existingRecords: T[] = await JSON.parse(
      readFileSync(this.storeFileName, "utf8")
    );
    if (
      existingRecords.find(
        (record) =>
          record[this.uniqueIdentifier] === data[this.uniqueIdentifier]
      )
    ) {
      throw new Error(
        `${this.resourceName} with the ${this.uniqueIdentifier} ${
          data[this.uniqueIdentifier]
        } already exists.`
      );
    }
    existingRecords.push(data);
    this.writeFullStore(existingRecords);
  };

  updateEntry = async (identifier: string, data: T) => {
    const existingData: T[] = await JSON.parse(
      readFileSync(this.storeFileName, "utf8")
    );
    const newData = existingData.map((entry) => {
      if (entry[this.uniqueIdentifier] !== identifier) return entry;
      return data;
    });
    await this.writeFullStore(newData);
    return data;
  };

  private writeFullStore = async (data: T[]) => {
    writeFile(this.storeFileName, JSON.stringify(data), (err) =>
      console.log(err)
    );
  };
}
