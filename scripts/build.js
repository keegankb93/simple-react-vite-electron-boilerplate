#!/usr/bin/env node
const { build } = require("vite");
const { dirname } = require("path");

const buildConfigFiles = [
  "app/main/vite.config.js",
  "app/preload/vite.config.js",
  "app/renderer/vite.config.js",
  "app/common/vite.config.js",
];

const buildByConfig = (configFile) => build({ configFile });
(async () => {
  try {
    const totalTimeLabel = "Total bundling time";
    console.time(totalTimeLabel);

    for (const configPath of buildConfigFiles) {
      const consoleGroupName = `${dirname(configPath)}/`;
      console.group(consoleGroupName);

      const timeLabel = "Bundling time";
      console.time(timeLabel);

      await buildByConfig(configPath);

      console.timeEnd(timeLabel);
      console.groupEnd();
      console.log("\n"); // Just for pretty print
    }
    console.timeEnd(totalTimeLabel);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

/*(async () => {
  for (const configPath of configPaths) {
    //let resolvePath = new URL(configPath, import.meta.url);
    //console.log(resolvePath);
    let resolvePath = "app/renderer/vite.config.js";
    console.log(resolvePath);
    await build({ inlineConfig: resolvePath });
  }
})();*/
