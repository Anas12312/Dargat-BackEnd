import express, { Request, Response } from "express";
import { GradeStore } from "../models/grade";



const gradeStore = new GradeStore();

const index = async (req: Request, res: Response) => {
    res.json(await gradeStore.index())
}


const routes = (app: express.Application) => {
    app.get('/', index);
}

export default routes;