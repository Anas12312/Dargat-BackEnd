import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './handlers/grades_handler'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOption = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
}

app.use(cors(corsOption));
app.use(bodyParser.json())

routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
})
