import Client from "../database";
import fs from 'fs'
import csv from 'csv-parser'

export type Grade = {
    id: number,
    name: string,
    sub1: number,
    sub2: number,
    sub3: number,
    sub4: number,
    sub5: number,
    sub6: number,
    total: number,
    percent: number
}

const  readData = async ():Promise<unknown[]> => {
    let results:unknown[] = [];
    const o = fs.createReadStream('data.csv');
            o.pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => console.log(results));

            console.log(o);
    return results;
}

export class GradeStore {
    index(): unknown[] {
        const x = readData();
        console.log("a7aaaaaaaaaaaaaaaaa");
        return x;
    }
}