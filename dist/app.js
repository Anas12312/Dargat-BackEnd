"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var sync_1 = require("csv-parse/sync");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var getRecordedData = function () {
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 4; j++) {
            var x = fs_1.default.readFileSync(path_1.default.join(__dirname, "../Data/_".concat(i).concat(j, ".csv"))).toString();
            records[i].push((0, sync_1.parse)(x, {
                columns: true,
                skip_empty_lines: true
            }));
        }
    }
};
var records = [[], [], [], [], []];
getRecordedData();
var updateRecord = function (dep, year) {
    var i = Number(dep);
    var j = Number(year);
    var x = fs_1.default.readFileSync(path_1.default.join(__dirname, "../Data/_".concat(i).concat(j, ".csv"))).toString();
    records[i][j] = (0, sync_1.parse)(x, {
        columns: true,
        skip_empty_lines: true
    });
};
var app = (0, express_1.default)();
var address = "127.0.0.1:80";
var corsOption = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOption));
app.use(body_parser_1.default.json());
app.get('/update', function (req, res) {
    var dep = req.query.dep;
    var year = req.query.year;
    if (!dep || !year) {
        res.status(400).send('Stop Missing With Our Data We Can See You !!');
        return;
    }
    updateRecord(dep, year);
    res.send('load el files ya 3bd');
});
app.get('/', function (req, res) {
    var dep = req.query.dep;
    var year = req.query.year;
    if (!dep || !year) {
        res.status(400).send('Stop Missing With Our Data We Can See You !!');
        return;
    }
    if (Number(dep) === 555 || Number(year) === 555) {
        res.status(400).send('Get The Fu*k Out !');
        return;
    }
    res.send(records[Number(dep)][Number(year)]);
});
app.listen(80, function () {
    console.log("starting app on: ".concat(address));
});
