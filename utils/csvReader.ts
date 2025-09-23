import fs from 'fs';
import path from 'path';

export function readTagsFromCsv() {
    const csvPath = path.join(__dirname, "..", "tags.csv");
    const fileContent = fs.readFileSync(csvPath, 'utf-8');

    return fileContent.split('\n');
}
