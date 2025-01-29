const fs = require('fs');
const path = require('path');

const inputDir = './json';  // Change this to your JSON files directory
const outputDir = './output';     // Directory to save formatted files

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read all files in the input directory
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, file);

        // Process only .json files
        if (path.extname(file) === '.json') {
            fs.readFile(inputFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', file, err);
                    return;
                }

                try {
                    // Parse and format JSON
                    const jsonData = JSON.parse(data);
                    const formattedJson = JSON.stringify(jsonData, null, 2);

                    // Save formatted JSON to the output directory
                    fs.writeFile(outputFilePath, formattedJson, 'utf8', err => {
                        if (err) {
                            console.error('Error writing file:', file, err);
                        } else {
                            console.log('Formatted and saved:', outputFilePath);
                        }
                    });
                } catch (error) {
                    console.error('Invalid JSON in file:', file, error);
                }
            });
        }
    });
});
