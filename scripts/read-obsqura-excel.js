const ExcelJS = require('exceljs');
const path = require('path');

async function readExcel() {
  const workbook = new ExcelJS.Workbook();
  const filePath = path.join(__dirname, '..', 'test-data', 'Obsqura Testing.xlsx');

  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet('Sheet1');
  if (!worksheet) {
    console.error('Sheet1 was not found in the workbook.');
    return;
  }

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      console.log(`Row ${rowNumber}, Column ${colNumber}: ${cell.value}`);
    });
  });
}

readExcel().catch((err) => console.error(err));