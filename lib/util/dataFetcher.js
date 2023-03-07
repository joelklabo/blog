import fs from 'fs/promises';

let instance = null;

export default class DataFetcher {
  constructor(filename, queryFn) {
    if (!instance) {
      instance = this;
      this.filename = filename;
      this.queryFn = queryFn;
      this.lastRequestTime = 0;
    }
    return instance;
  }

  async getData() {
    const now = Date.now();
    if (now - this.lastRequestTime < 60000) {
      console.log('Using cached data');
      const data = await fs.readFile(this.filename, 'utf-8');
      return JSON.parse(data);
    } else {
      console.log('Fetching new data');
      const newData = await this.queryFn();
      await fs.writeFile(this.filename, JSON.stringify(newData));
      this.lastRequestTime = now;
      return newData;
    }
  }
}
