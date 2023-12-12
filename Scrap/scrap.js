const ObjectsToCsv = require('objects-to-csv');
const puppeteer =  require("puppeteer");
const path = require('path');

async function getData(start, end) {
    const browser = await puppeteer.launch({ headless:false })
    const page = await browser.newPage();
    const arr = [];


    await page.goto(`http://app1.helwan.edu.eg/FaslBU/EngMatrya/HasasnUpMview.asp?StdCode=${start}`,{timeout: 0});
        const data = await page.evaluate(() => {
            const record = Array.from(document.querySelectorAll('b')).map((x) => x.textContent);

            obj = {
                id : 0,
                name: '',
                total: 0,
                p: ''
            }
            return obj
        })
        arr.push(data);
        

    for(let i=start;i <= end;i++) {
        await page.goto(`http://app1.helwan.edu.eg/FaslBU/EngMatrya/HasasnUpMview.asp?StdCode=${i}`,{timeout: 0});
        const data = await page.evaluate(() => {
            const record = Array.from(document.querySelectorAll('b')).map((x) => x.textContent);
            const id =record[8];
            const total = record[193];
            const p = record[197];
            
            obj = {
                id,
                name: record[5],
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
const runScript = async (start, end, dep, year) => {
    const arr = await getData(start,end);
    objToCsv(arr,dep, year);
    console.log('55')
}

runScript(33180, 33442, 9, 9)

// export default runScript;