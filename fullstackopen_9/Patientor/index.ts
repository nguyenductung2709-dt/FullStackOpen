import express from 'express';
import diagnoseService from './src/services/diagnoseService';
import patientService from './src/services/patientService';
import { toNewPatientsEntry, toNewEntry } from './src/utils';
import { v1 as uuid } from 'uuid'
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  console.log('someone pinged here');
  res.send(diagnoseService.getEntries());
});

app.get('/api/patients', (_req, res) => {
  console.log('someone pinged here');
  res.send(patientService.getNonSensitivePatients());
});

app.get('/api/patients/:id', (req, res) => {
  const id = req.params.id;
  const patients = patientService.getPatients();
  const patient = patients.find((patient) => patient.id === id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

app.post('/api/patients', (req, res) => {
  try {
    const newPatientsEntry = toNewPatientsEntry(req.body); // Corrected variable name
    const addedPatient = patientService.addPatients(newPatientsEntry);
    res.json(addedPatient);
    console.log(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

app.post('/api/patients/:id/entries', (req, res) => {
  try {
    const newEntry = req.body;
    const newestEntry = {
      id : uuid(),
      ...newEntry
    }
    const id = req.params.id;
    const confirmedEntry = toNewEntry(newestEntry);
    const addedEntry = patientService.addEntry(confirmedEntry, id);
    res.json(addedEntry);
    console.log(addedEntry); 
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.error(errorMessage); 
    res.status(400).send(errorMessage);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});