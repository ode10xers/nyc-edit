const fs = require("fs");
const path = require("path");

const outputDir = "./output"; // Folder containing JSON files to modify
const keyToRemove =
  "/home/afdaall27/Documents/10xers/standalone-salon-fe/src/pages/Settings/SettingsLayout/index.jsx";

// Read all files in the output directory
fs.readdir(outputDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(outputDir, file);

    // Process only .json files
    if (path.extname(file) === ".json") {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", file, err);
          return;
        }

        try {
          let jsonData = JSON.parse(data);

          // Remove the key if it exists
          if (jsonData.hasOwnProperty(keyToRemove)) {
            delete jsonData[keyToRemove];
            console.log(`Removed key from ${file}`);
            
            // Rewrite the modified JSON back to the same file
            fs.writeFile(
              filePath,
              JSON.stringify(jsonData, null, 2),
              "utf8",
              (err) => {
                if (err) {
                  console.error("Error writing file:", file, err);
                } else {
                  console.log(`Updated file rewritten: ${filePath}`);
                }
              }
            );
          }

        } catch (error) {
          console.error(`Invalid JSON in file: ${file}`, error);
        }
      });
    }
  });
});
