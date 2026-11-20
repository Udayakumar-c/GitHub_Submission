// Creates data/Obsqura Testing.xlsx with sample rows, so Task 4 can run out of the box.
// Replace the file with your own workbook if you have one.
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

async function main() {
  const dir = path.join(__dirname, '..', 'data');
  fs.mkdirSync(dir, { recursive: true });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Sheet1');
  sheet.addRow(['Name', 'Email', 'Role']);
  sheet.addRow(['Sibi Kumar', 'sibi@gmail.com', 'Tester']);
  sheet.addRow(['Asha Raj', 'asha@example.com', 'Developer']);

  const out = path.join(dir, 'Obsqura Testing.xlsx');
  await workbook.xlsx.writeFile(out);
  console.log(`Sample workbook written to: ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
