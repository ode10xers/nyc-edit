const fs = require("fs");
const path = require("path");

const inputFilePath = "./test.json";
const outputFilePath = "./test-updated.json";

// Text values to remove
const textsToRemove = ["GiftCardOrderDetailsForm"];

fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    let jsonData = JSON.parse(data); // Parse JSON

    // Convert JSON to a string for search & replace
    let jsonString = JSON.stringify(jsonData, null, 2);

    // Replace all occurrences of textsToRemove
    textsToRemove.forEach((text) => {
      jsonString = jsonString.replace(new RegExp(`"${text}",?`, "g"), "");
    });

    // Save modified JSON
    fs.writeFile(outputFilePath, jsonString, "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log(`Updated file saved: ${outputFilePath}`);
      }
    });
  } catch (error) {
    console.error("Invalid JSON:", error);
  }
});
