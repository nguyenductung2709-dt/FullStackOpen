"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoseService_1 = __importDefault(require("./src/services/diagnoseService"));
const patientService_1 = __importDefault(require("./src/services/patientService"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
const PORT = 3000;
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.get('/api/diagnoses', (_req, res) => {
    console.log('someone pinged here');
    res.send(diagnoseService_1.default.getEntries());
});
app.get('/api/patients', (_req, res) => {
    console.log('someone pinged here');
    res.send(patientService_1.default.getNonSensitivePatients());
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
