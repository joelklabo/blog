const fs = require('fs');

export function readJsonFile(filePath) {
  try {
    const jsonString = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function writeJsonFile(data, filePath) {
  try {
    const dataString = JSON.stringify(data);
    fs.writeFileSync(filePath, dataString);
  } catch (error) {
  }
}