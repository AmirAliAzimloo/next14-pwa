const fs = require('fs');
const path = require('path');


/**
 * Extracts next14-pwa strings from the provided CSS text.
 * 
 * @param cssText The content of the CSS file as a string
 * @returns An array of strings with the 'next14-pwa-' prefix removed
 */
function extractCssToStrings(cssText: string): string[] {
  const regex = /next14-pwa-[\w-]+/g;
  const matches = cssText.match(regex);
  return matches ? matches.map((el) => el.replace('next14-pwa-', '')) : [];
}

// Define the path to the CSS file
const cssFilePath = path.join(__dirname, '../public/icomoon/style.css');

/**
 * Reads the CSS file, extracts next14-pwa strings, and writes them to a TypeScript file.
 */
fs.readFile(cssFilePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string ) => {
  if (err) {
    console.error(`Error reading the file: ${err}`);
    return;
  }

  const cssText = data;
  const cssToStrings = extractCssToStrings(cssText);

  // TypeScript code that defines the icon list and type
  const tsCode = `const iconList: TIconType[] = ${JSON.stringify(cssToStrings)};\n
export default iconList;\n
export type TIconType = ${cssToStrings
      .map((el) => JSON.stringify(el))
      .join(' | ')};`;

  // Write the generated TypeScript code to a file
  fs.writeFile('constants/iconList.ts', tsCode, (writeErr: NodeJS.ErrnoException | null) => {
    if (writeErr) {
      console.error(`Error writing the TypeScript file: ${writeErr}`);
      return;
    }

    console.log('Strings saved to iconList.ts');
  });
});
