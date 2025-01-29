const fs = require('fs');
const path = require('path');

const outputDir = './output'; // Directory containing JSON files

const textsToRemove = ["GiftCardOrderDetailsForm"];

// Function to process all files in the output folder
fs.readdir(outputDir, (err, files) => {
    if (err) {
        console.error('Error reading output directory:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(outputDir, file);

        // Process only .json files
        if (path.extname(file) === '.json') {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', file, err);
                    return;
                }

                try {
                    let jsonData = JSON.parse(data); // Parse JSON

                    // Convert JSON to a string for search & replace
                    let jsonString = JSON.stringify(jsonData, null, 2);

                    // Replace all occurrences of textsToRemove
                    textsToRemove.forEach(text => {
                        jsonString = jsonString.replace(new RegExp(`"${text}",?`, 'g'), '');
                    });

                    // Rewrite the modified JSON back to the same file
                    fs.writeFile(filePath, jsonString, 'utf8', err => {
                        if (err) {
                            console.error('Error writing file:', file, err);
                        } else {
                            console.log(`Updated file saved: ${filePath}`);
                        }
                    });

                } catch (error) {
                    console.error(`Invalid JSON in file: ${file}`, error);
                }
            });
        }
    });
});
