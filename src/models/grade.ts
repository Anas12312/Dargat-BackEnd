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


export class GradeStore {
    async index(): Promise<unknown[]> {
        const csv = fs.readFileSync("data.csv");
        const array = csv.toString().split("\r");
        let result = [];
        let headers = array[0].split(", ");
        for (let i = 1; i < array.length - 1; i++) {
            let obj = {}
            let str = array[i]
            let s = ''
            let flag = 0
            for (let ch of str) {
              if (ch === '"' && flag === 0) {
                flag = 1
              }
              else if (ch === '"' && flag == 1) flag = 0
              if (ch === ', ' && flag === 0) ch = '|'
              if (ch !== '"') s += ch
            }

            let properties = s.split("|")
            obj = {
                [headers[0]]: properties[0],
                [headers[1]]: properties[1]
            }
            
            result.push(obj)
          }
          return result;
    }
}