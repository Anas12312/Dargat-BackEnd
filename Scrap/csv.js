const ObjectsToCsv = require('objects-to-csv');
const puppeteer = require("puppeteer");
const path = require('path');
const csv = require('csv-parse/sync')
const fs = require('fs')


const x = fs.readFileSync(path.join(__dirname, `../Data/_22.csv`)).toString();
let records = csv.parse(x, {
    columns: true,
    skip_empty_lines: true
});

records.forEach(element => {
    element.p = (element.total / 650) * 100
});

const a = async () => {
    const s = new ObjectsToCsv(records);
    await s.toDisk(path.join(__dirname, `../Data/_22.csv`)); 
}
a();
console.log(records)