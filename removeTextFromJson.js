const fs = require('fs');
const path = require('path');
const readline = require('readline');

const outputDir = './output';
const textsToRemove = ["GiftCardOrderDetailsForm"];

async function processFile(filePath) {
    const tempFilePath = filePath + '.tmp';

    const inputStream = fs.createReadStream(filePath);
    const outputStream = fs.createWriteStream(tempFilePath);
    const rl = readline.createInterface({ input: inputStream, output: outputStream, terminal: false });

    for await (const line of rl) {
        let newLine = line;
        textsToRemove.forEach(text => {
            newLine = newLine.replace(new RegExp(`"${text}",?`, 'g'), '');
        });
        outputStream.write(newLine + '\n');
    }

    outputStream.end();

    outputStream.on('finish', () => {
        fs.rename(tempFilePath, filePath, (err) => {
            if (err) console.error('Error replacing file:', filePath, err);
            else console.log('Updated file:', filePath);
        });
    });
}

// Process all JSON files in output directory
fs.readdir(outputDir, (err, files) => {
    if (err) {
        console.error('Error reading output directory:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(outputDir, file);
        if (path.extname(file) === '.json') {
            processFile(filePath);
        }
    });
});
