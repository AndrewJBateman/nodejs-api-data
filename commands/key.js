require("dotenv").config();

const inquirer = require("inquirer");
const colors = require("colors");
const KeyManager = require("../lib/KeyManager");
const { isRequired } = require("../utils/validation");
const alphaNumeric = /^[0-9a-zA-Z]+$/;

const key = {
  async set() {
    const keyManager = new KeyManager();
    const input = await inquirer.prompt([
      {
        type: "input",
        name: "key",
        message: "Enter API key obtained from https://nomics.com or press ENTER to use default API key. "
          .green,
        // validate: isRequired,
      },
    ]);

    // const key = keyManager.setKey(input.key);

    // If user enters an empty string my default API key from the .env file is used
    if (input.key === "") {
      const key = keyManager.setKey(process.env.API_key);
      console.log("default API key used".blue);
      return key;
    }

    // check if user input a key and that it is 12 characters long
    else if (input.key.length === 12 && input.key.match(alphaNumeric)) {
      const key = keyManager.setKey(input.key);
      console.log("API key set".blue);
      return key;
    }

    // user to input key again if the input key was not an empty string or it was not 12 characters long
    console.log("API key should be alphanumeric and 12 characters long. ".red + "Try again.".blue);
    return;
  },

  show() {
    try {
      const keyManager = new KeyManager();
      const key = keyManager.getKey();

      console.log("Current API key: ", key.green);

      return key;
    } catch (err) {
      console.error("error ", err.message.red);
    }
  },

  remove() {
    try {
      const keyManager = new KeyManager();
      keyManager.deleteKey();

      console.log("Key removed".blue);

      return;
    } catch (err) {
      console.error("error ", err.message.red);
    }
  },
};

module.exports = key;
