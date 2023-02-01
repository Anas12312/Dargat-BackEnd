import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './handlers/grades_handler'
import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'


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

app.use(cors(corsOption));
app.use(bodyParser.json())

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
    res.send(records[Number(dep)][Number(year)]);
})

app.listen(80, function () {
    console.log(`starting app on: ${address}`);
})