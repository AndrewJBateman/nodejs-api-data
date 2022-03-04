import KeyManager from "../lib/KeyManager.js";
import CryptoAPI from "../lib/CryptoAPI.js";

const check = {
  async price(cmd) {
    try {
      const keyManager = new KeyManager();
      const key = keyManager.getKey();

      const api = new CryptoAPI(key);

      const priceOutputData = await api.getPriceData(cmd.coin, cmd.cur);

      console.log(priceOutputData);
    } catch (err) {
      console.error("error: ", err.message.red);
    }
  },
};

export default check;
