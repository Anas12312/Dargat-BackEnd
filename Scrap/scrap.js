const ObjectsToCsv = require('objects-to-csv');
const puppeteer =  require("puppeteer");
const path = require('path');

async function getData(start, end) {
    const browser = await puppeteer.launch({ headless:true })
    const page = await browser.newPage();
    const arr = [];
    for(let i=start;i <= end;i++) {
        await page.goto(`http://app1.helwan.edu.eg/Commerce/HasasnUpMview.asp?StdCode=${i}`);
        const data = await page.evaluate(() => {
            const record = Array.from(document.querySelectorAll('b')).map((x) => x.textContent);
            const id =record[8];
            const subject1 = Number(record[42]);
            const subject2 = Number(record[56]);
            const subject3 = Number(record[70]);
            const subject4 = Number(record[84]);
            const subTitle1 = record[38];
            // const subject5 = Number(record[98]);
            // const subject6 = Number(record[112]);
            const total = subject1+subject2+subject3+subject4;
            const p = (total/550)*100
            console.log(record[42])
            
            obj = {
                id,
                name: record[5],
                subject1,
                subject2,
                subject3,
                subject4,
                total,
                p
            }

            return obj
        })
        if(Number(data.id) !== 0) arr.push(data);
    }
    browser.close();
    return arr;
}
const objToCsv = async (arr,i ,j) => {
    const csv = new ObjectsToCsv(arr);
    await csv.toDisk(path.join(__dirname, `../Data/_${i}${j}.csv`));
}
const run = async (start, end, dep, year) => {
    const result = await getData(start,end);
    console.log(result.arr)
    // objToCsv(arr,dep, year);
}
run(285260,285263,0,0);