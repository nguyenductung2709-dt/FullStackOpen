"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
const getEntries = () => {
    return diagnoses_1.default;
};
const addDiagnoses = (newEntry) => {
    diagnoses_1.default.push(newEntry);
};
exports.default = {
    getEntries,
    addDiagnoses
};
