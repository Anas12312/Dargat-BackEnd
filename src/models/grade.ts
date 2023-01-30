import Client from "../database";

export type Grade = {
    id:number,
    name:string,
    sub1:number,
    sub2:number,
    sub3:number,
    sub4:number,
    sub5:number,
    sub6:number,
    total:number,
    percent:number
}

export class GradeStore {
    async index(): Promise<Grade[]> {
        try {
            const conn = await Client.connect();
            const sql = "";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err) {
            throw new Error(`Failed: ${err}`);
        }
    }
}