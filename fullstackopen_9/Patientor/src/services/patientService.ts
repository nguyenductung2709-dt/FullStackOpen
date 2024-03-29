import { Patient, NonSensitivePatient, NewPatientsEntry, Entry } from '../types/patientTypes';
import patientsEntries  from '../../data/patients';
import { v1 as uuid } from 'uuid'


const getPatients = (): Patient[] => {
    return patientsEntries;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => { //add non sensitive
    return patientsEntries.map(({ ssn, ...rest }) => rest); 
};

const addPatients = (newEntry: NewPatientsEntry): Patient => {
    const newestEntry = {
        id: uuid(),
        ...newEntry
    }
    patientsEntries.push(newestEntry);
    return newestEntry;
};

const addEntry = (newEntry: Entry, id: string): Entry => {
    const patient = patientsEntries.find((patient) => patient.id === id);
    if (patient) {
        patient.entries.push(newEntry);
    }
    return newEntry;
}

export default {
    getPatients,
    getNonSensitivePatients,
    addPatients,
    addEntry
};