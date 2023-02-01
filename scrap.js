const ObjectsToCsv = require('objects-to-csv');
const puppeteer =  require("puppeteer");

async function getData(start, end) {
    const browser = await puppeteer.launch({ headless:false })
    const page = await browser.newPage();
    const arr = [];
    for(let i=start;i <= end;i++) {
        await page.goto(`http://app1.helwan.edu.eg/Computer/HasasnUpMview.asp?StdCode=${i}`);
        const data = await page.evaluate(() => {
            const record = Array.from(document.querySelectorAll('b')).map((x) => x.textContent);
            const subject1 = Number(record[42]);
            const subject2 = Number(record[56]);
            const subject3 = Number(record[70]);
            const subject4 = Number(record[84]);
            const subject5 = Number(record[98]);
            const subject6 = Number(record[112]);
            const total = subject1+subject2+subject3+subject4+subject5+subject6;
            console.log(record[5])
            return {
                id: record[8],
                name: record[5],
                subject1,
                subject2,
                subject3,
                subject4,
                subject5,
                subject6,
                total
            }
        })
        arr.push(data);
    }
    browser.close();
    return arr;
}
const objToCsv = async (arr) => {
    const csv = new ObjectsToCsv(arr);
    await csv.toDisk('./test.csv');
}
const run = async (start, end, dep, year) => {
    objToCsv(await getData(10001,10003));
}
run(10001,10003,0,2);