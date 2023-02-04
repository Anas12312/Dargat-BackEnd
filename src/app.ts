import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'
import e from 'cors'
import run from '../Scrap/scrap'

let lastSavedStats:number[] = Array(21).fill(0);
let stats:number[] = Array(21).fill(0);

const refreshStates = (index: number) => {
    const file = fs.createWriteStream(path.join(__dirname,'../Stats/stats.txt'));
    stats.forEach(function(v) { file.write(v + '\n'); });
    file.end();
    lastSavedStats = [...stats];
}

const getStats = () => {
    fs.readFile(path.join(__dirname,'../Stats/stats.txt'), (err, data) => {
        const statsString = data.toString().split('\n');
        statsString.forEach((state, i) => {
            lastSavedStats[i] = Number(state);
        })
        stats = [...lastSavedStats];
    })
    
}
getStats();


function appendReport(report: string) {
    fs.appendFileSync(path.join(__dirname,'../Report/reports.txt'), report); 
}

const getRecordedData = () => {
    for(let i=0; i<5; i++) {
        for(let j=0; j<4; j++) {
        const x = fs.readFileSync(path.join(__dirname, `../Data/_${i}${j}.csv`)).toString();
        records[i].push(parse(x, {
            columns: true,
            skip_empty_lines: true
        }));
        }
    } 
}

const records:unknown[][] = [[],[],[],[],[]];

getRecordedData();

const updateRecord = (dep:string,year:string) => {
    const i = Number(dep);
    const j = Number(year);

    const x = fs.readFileSync(path.join(__dirname, `../Data/_${i}${j}.csv`)).toString();
        records[i][j] = parse(x, {
            columns: true,
            skip_empty_lines: true
        });
}

const app: express.Application = express()
const address: string = "127.0.0.1:80"

const corsOption = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors())
app.use(bodyParser.json())


app.post("/report", function(req, res) {
    const report = `==============================` +
                    `\n${req.body.title}` +
                    `\n${req.body.body}\n` 
    appendReport(report)
    res.send('ok');
})

app.get('/update', (req, res) => {
    const dep = req.query.dep as string;
    const year = req.query.year as string;
    if (!dep || !year) {
        res.status(400).send('Stop Missing With Our Data We Can See You !!');
        return;
    }
    updateRecord(dep, year);
    res.send('load el files ya 3bd');
})

app.get('/', (req, res) => {
    const dep = req.query.dep as string;
    const year = req.query.year as string;
    if (!dep || !year) {
        res.status(400).send('Stop Missing With Our Data We Can See You !!');
        return;
    }
    if(Number(dep) === 555 || Number(year) === 555) {
        res.status(400).send('Get The Fu*k Out !');
        return;
    }
    stats[0]++;
    if(stats[0] - lastSavedStats[0] >= 5) {
        refreshStates(0);
    }
    stats[Number(dep)*4 + Number(year) + 1]++;
    if(stats[Number(dep)*4 + Number(year) + 1] - lastSavedStats[Number(dep)*4 + Number(year) + 1] >= 5) {
        refreshStates(Number(dep)*4 + Number(year) + 1);
    }
    res.send(records[Number(dep)][Number(year)]);
})

app.get('/reports',  (req,res) => {
    fs.readFile(path.join(__dirname,'../Report/reports.txt'), (err, data) => {
        if(err) throw err;
        res.send(data.toLocaleString());
    })
})

app.get('/stats', (req, res) => {
    res.send(JSON.stringify({counters: stats}))
})

app.get('/a7a',  (req, res) => {
    run(req.query.start, req.query.end, req.query.d, req.query.y);
    res.send('a7aten')
})

app.get('/wtf', (req,res) => {
    res.send('a7a')
})

app.listen(5555, function () {
    console.log(`starting app on: ${address}`);
})
