import fs from "fs/promises";
import path from "path";
import { EOL } from "os";
import favicons, { config, } from "favicons";
import yargs from "yargs/yargs";
const parser = yargs();
function initParser() {
    const options = config.defaults;
    Object.keys(options).forEach((key) => {
        if (key === "version") {
            parser.default("appVersion", options[key]);
        }
        else {
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
function sanitizeOptions(options) {
    const output = {};
    Object.keys(config.defaults).forEach((key) => {
        output[key] = options[key];
    });
    if ("appVersion" in options) {
        output["version"] = options["version"];
    }
    return [
        {
            source: options.source,
            destination: options.destination,
        },
        output,
    ];
}
async function generateImages(files, resp) {
    try {
        await fs.mkdir(files.destination);
        const promises = [];
        for (const img of resp.images) {
            const dest = path.join(files.destination, img.name);
            promises.push(fs.writeFile(dest, img.contents));
        }
        await Promise.all(promises);
    }
    catch (err) {
        console.error(err);
    }
}
async function main() {
    initParser();
    const argv = parser.parse(process.argv.slice(2));
    const [files, faviconParams] = sanitizeOptions(argv);
    try {
        const result = await favicons(files.source, faviconParams);
        await generateImages(files, result);
        console.log(`favicons successfully created!

${result.images.map(({ name }) => "* " + path.join(files.destination, name))
            .join(EOL)}
    `.trim());
    }
    catch (err) {
        console.error(err);
    }
}
await main();
