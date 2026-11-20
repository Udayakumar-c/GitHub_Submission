// Task 4 - Read "Sheet1" from an Excel workbook with ExcelJS and print every cell.
// Usage: node scripts/read-excel.js "data/Obsqura Testing.xlsx"
const ExcelJS = require('exceljs');
const path = require('path');

async function readExcel(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet('Sheet1');
  if (!worksheet) {
    throw new Error(`Worksheet "Sheet1" not found in ${filePath}`);
  }

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      console.log(`Row ${rowNumber}, Col ${colNumber}: ${cell.text}`);
    });
  });
}

const target = process.argv[2] || path.join(__dirname, '..', 'data', 'Obsqura Testing.xlsx');

readExcel(target).catch((err) => {
  console.error(err.message);
  process.exit(1);
});
