import { Patient, Entry, Diagnosis } from '../types';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import patientService from '../services/patients';
import diagnoseService from '../services/diagnoses';
import '../css/individualPatient.css';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealthEntryForm from './HealthEntryForm';

const IndividualPatient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const patientData = await patientService.getById(id);
          setPatient(patientData);
        }
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };

    fetchPatient();

    return () => {
      setPatient(null); 
    };
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnosesData = await diagnoseService.getAll();
      setDiagnoses(diagnosesData);
    }
    fetchDiagnoses();
  }, []); 

  const renderEntry = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <div key={entry.id} className = "entry">
            <p>
              <span>{entry.date}</span> <span> <i>{entry.description}</i> </span>{" "}
            </p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((diagnosisCode, index) => {
                  const diagnosis = diagnoses?.find(diagnose => diagnose.code === diagnosisCode);
                  return (
                    <li key={index}>
                      {diagnosisCode} {diagnosis ? diagnosis.name : 'Unknown Diagnosis'}
                    </li>
                  );
                })}
              </ul>
            )}
            {entry.discharge && (
              <p>Discharge Date: {entry.discharge.date}</p>
            )}
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div key={entry.id} className = "entry">
            <p>
              <span>{entry.date}</span> <span> <LocalPoliceIcon/> </span> <span> <i>{entry.employerName}</i> </span>{" "}
            </p>
            <p> <i>{entry.description}</i> </p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((diagnosisCode, index) => {
                  const diagnosis = diagnoses?.find(diagnose => diagnose.code === diagnosisCode);
                  return (
                    <li key={index}>
                      {diagnosisCode} {diagnosis ? diagnosis.name : 'Unknown Diagnosis'}
                    </li>
                  );
                })}
              </ul>
            )}
            {entry.sickLeave && (
              <p>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
            )}
          </div>
        );
        case "HealthCheck":
          return (
            <div key={entry.id} className = "entry">
              <p> <span> {entry.date} </span> <span> <LocalHospitalIcon/> </span>  </p>
              <p><i>{entry.description}</i></p>
              {entry.healthCheckRating >= 0 && (
                <FavoriteIcon/>
              )}
              <p> diagnose by {entry.specialist} </p>
            </div>
          );
      default:
        return null;
    }
  };

  if (!patient) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <h2>
        {patient.name}{" "}
        <span>{patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}</span>
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <HealthEntryForm id = {id}/>
      <h2> entries </h2>
      {patient.entries.map(renderEntry)}
    </>
  );
};

export default IndividualPatient;
