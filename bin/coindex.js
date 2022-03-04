#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

program
  .version(pkg.version)
  .command("key", "Manage API key -- https://nomics.com")
  .command("check", "Check Coin Price Info.")
  .parse(process.argv);
