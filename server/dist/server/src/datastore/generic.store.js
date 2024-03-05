import { readFileSync, writeFile } from "fs";
export var DataStores;
(function (DataStores) {
    DataStores["USER"] = "user";
    DataStores["CHANNEL"] = "channel";
})(DataStores || (DataStores = {}));
export class GenericStore {
    constructor(store, uniqueIdentifier, resourceName) {
        this.store = store;
        this.uniqueIdentifier = uniqueIdentifier;
        this.resourceName = resourceName;
        this.readFullStore = async () => {
            const data = await JSON.parse(readFileSync(this.storeFileName, "utf8"));
            return data;
        };
        this.getEntry = async (identifer) => {
            const data = await JSON.parse(readFileSync(this.storeFileName, "utf8"));
            const entry = data.find((e) => e[this.uniqueIdentifier] === identifer);
            return entry;
        };
        this.createEntry = async (data) => {
            const existingRecords = await JSON.parse(readFileSync(this.storeFileName, "utf8"));
            if (existingRecords.find((record) => record[this.uniqueIdentifier] === data[this.uniqueIdentifier])) {
                throw new Error(`${this.resourceName} with the ${this.uniqueIdentifier} ${data[this.uniqueIdentifier]} already exists.`);
            }
            existingRecords.push(data);
            this.writeFullStore(existingRecords);
        };
        this.updateEntry = async (identifier, data) => {
            const existingData = await JSON.parse(readFileSync(this.storeFileName, "utf8"));
            const newData = existingData.map((entry) => {
                if (entry[this.uniqueIdentifier] !== identifier)
                    return entry;
                return data;
            });
            await this.writeFullStore(newData);
            return data;
        };
        this.deleteEntry = async (identifier) => {
            const existingData = await JSON.parse(readFileSync(this.storeFileName, "utf8"));
            const newData = existingData.filter((data) => data[this.uniqueIdentifier] !== identifier);
            await this.writeFullStore(newData);
            return true;
        };
        this.writeFullStore = async (data) => {
            writeFile(this.storeFileName, JSON.stringify(data), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        };
        this.storeFileName = `src/datastore/${this.store}.json`;
    }
}
//# sourceMappingURL=generic.store.js.map