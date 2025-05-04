import fs from "fs/promises";
import {analyzeLines} from './locAnalyzers/jsAnalyser.js'

const filePaths = process.argv.slice(2);

if (filePaths.length === 0) {
    console.error("Please provide at least one file path.");
    process.exit(1);
}

const processFile = async (filePath) => {
    try {
        const content = await fs.readFile(filePath, "utf-8");
        const lines = content.split("\n");
        const result = analyzeLines(lines);
        return { filePath, ...result };
    } catch (error) {
        return { filePath, error: error.message };
    }
}

(async () => {
    const promises = filePaths.map(processFile);
    const results = await Promise.all(promises);

    for (const res of results) {
        if (res.error) {
            console.error(`Error reading ${res.filePath}: ${res.error}`);
        } else {
            console.log(`${res.filePath}`);
            console.log(`Blank: ${res.blank}`);
            console.log(`Comments: ${res.comments}`);
            console.log(`Code: ${res.code}`);
            console.log(`Total: ${res.total}\n`);
        }
    }
})();
