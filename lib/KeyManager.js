import Configstore from "configstore"
import fs from "fs";
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

export default class KeyManager {
  constructor() {
    this.conf = new Configstore(pkg.name);
  }

  setKey(key) {
    this.conf.set('apiKey', key);
    return key;
  }

  getKey() {
    const key = this.conf.get('apiKey');

    if (!key) {
      throw new Error('No API key found - get a ket at http://nomics.com');
    }

    return key;
  }

  deleteKey() {
    const key = this.conf.get('apiKey');

    if (!key) {
      throw new Error('No API key found - get a ket at http://nomics.com');
    }

    this.conf.delete('apiKey');

    return;
  }
}
