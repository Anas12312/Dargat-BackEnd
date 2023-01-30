import Client from "../database";

export type Book = {
    id?:number,
    title: string,
    author: string,
    totalpages: number,
    summary: string
}

export class GradeStore {
    async index(): Promise<Book[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM books";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err) {
            throw new Error(`Failed: ${err}`);
        }
    }
}