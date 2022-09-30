import fs from "fs/promises";
import path from "path";
import { EOL } from "os";
import favicons, {
  config,
  type FaviconOptions,
  type FaviconResponse,
} from "favicons";
import yargs from "yargs/yargs";

type FaviconFileInfo = {
  source: string;
  destination: string;
};

const parser = yargs();

function initParser() {
  const options = config.defaults as Record<string, unknown>;
  Object.keys(options).forEach((key) => {
    if (key === "version") {
      parser.default("appVersion", options[key]);
    } else {
      parser.default(key, options[key]);
    }
  });
  parser.option("source", {
    alias: "s",
    demandOption: true,
    type: "string",
  });
  parser.option("destination", {
    alias: "d",
    demandOption: true,
    type: "string",
  });
}

function sanitizeOptions(
  options: Record<string, unknown>,
): [FaviconFileInfo, FaviconOptions] {
  const output: Record<string, unknown> = {};
  Object.keys(config.defaults).forEach((key) => {
    output[key] = options[key];
  });
  if ("appVersion" in options) {
    output["version"] = options["version"];
  }

  return [
    {
      source: options.source as string,
      destination: options.destination as string,
    },
    output,
  ];
}

async function generateImages(
  files: FaviconFileInfo,
  resp: FaviconResponse,
): Promise<void> {
  try {
    await fs.mkdir(files.destination);
    const promises = [];
    for (const img of resp.images) {
      const dest = path.join(files.destination, img.name);
      promises.push(fs.writeFile(dest, img.contents));
    }

    await Promise.all(promises);
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  initParser();
  const argv = parser.parse(process.argv.slice(2));
  const [files, faviconParams] = sanitizeOptions(
    argv as Record<string, unknown>,
  );

  try {
    const result = await favicons(files.source, faviconParams);
    await generateImages(files, result);

    console.log(`favicons successfully created!

${
      result.images.map(({ name }) => "* " + path.join(files.destination, name))
        .join(EOL)
    }
    `.trim());
  } catch (err) {
    console.error(err);
  }
}

await main();
