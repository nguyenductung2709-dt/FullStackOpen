import diagnosesEntries from "../../data/diagnoses";
import { DiagnosesEntry } from "../types/diagnoseTypes";

const getEntries = (): DiagnosesEntry[] => {
    return diagnosesEntries;
};

const addDiagnoses = (newEntry: DiagnosesEntry): void => {
    diagnosesEntries.push(newEntry);
};

export default {
    getEntries,
    addDiagnoses
};
