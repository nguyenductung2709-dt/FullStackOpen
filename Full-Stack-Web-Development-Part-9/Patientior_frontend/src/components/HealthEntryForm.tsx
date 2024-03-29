import React, { useState } from 'react';
import axios from 'axios';
import { Entry, HealthCheckRating } from '../types';

interface Props {
    id: string | undefined;
}

const HealthEntryForm = ({ id }: Props) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [type, setType] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | null>(null);
    const [diagnoses, setDiagnoses] = useState<string[]>([]);
    const [dateOfDischarge, setDateOfDischarge] = useState('');
    const [criteria, setCriteria] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [employerName, setEmployerName] = useState('');


    const entryCreation = (event: React.FormEvent) => {
        event.preventDefault();
        const baseEntry = {
            date: date,
            type: type,
            specialist: specialist,
            diagnosisCodes: diagnoses,
            description: description,
        }
        let newEntry = {}
        if (type === "Hospital") {
            newEntry = {
                ...baseEntry,
                discharge: {
                    date: dateOfDischarge,
                    criteria: criteria
                }
            };
        } else if (type === "OccupationalHealthcare") {
            newEntry = {
                ...baseEntry,
                employerName: employerName,
                sickLeave: {
                    startDate: startDate,
                    endDate: endDate
                }
            }
        } else if (type === "HealthCheck") {
            newEntry = {
                ...baseEntry,
                healthCheckRating: healthCheckRating
            };
        }

        axios.post<Entry>(`http://localhost:3000/api/patients/${id}/entries`, newEntry)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error adding entry:', error);
            });
        setDate('');
        setDescription('');
        setSpecialist('');
        setDiagnoses([]);
        setDateOfDischarge('');
        setCriteria('');
    };

    const handleDiagnosesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDiagnoses(value.split(',').map(code => code.trim()));
    };

    return (
        <>
            <h3> New HealthCheck entry </h3>
            <form onSubmit={entryCreation}>
                <div> Date:
                    <input type="date" value={date} onChange={({ target }) => setDate(target.value)} />
                </div>
                <div> Type: 
                    <select value = {type} onChange={({ target }) => setType(target.value)}>
                        <option value="">Select type</option>
                        <option value="OccupationalHealthcare">OccupationalHealthcare</option>
                        <option value="Hospital">Hospital</option>
                        <option value="HealthCheck">HealthCheck</option>
                    </select>
                </div>
                <div> Description:
                    <input type="text" value={description} onChange={({ target }) => setDescription(target.value)} />
                </div>
                <div> Specialist:
                    <input type="text" value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
                </div>
                <div> Diagnoses codes:
                    <input type="text" value={diagnoses.join(',')} onChange={handleDiagnosesChange} />
                </div>
                {type === "Hospital" &&
                    <>
                        <p> Discharge: </p>
                        <div>
                            Date:
                            <input type="date" value={dateOfDischarge} onChange={({ target }) => setDateOfDischarge(target.value)} />
                        </div>
                        <div>
                            Criteria:
                            <input type="text" value={criteria} onChange={({ target }) => setCriteria(target.value)} />
                        </div>
                    </>
                }
                {type === "HealthCheck" &&
                    <>
                        <div>
                            HealthCheckRating:
                            <select value={healthCheckRating || ''} onChange={({ target }) => setHealthCheckRating(parseInt(target.value))}>
                                <option value="">Select rating</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </>
                }
                {type === "OccupationalHealthcare" && 
                    <>
                        <div>
                            Employer Name:
                            <input type = "text" value = {employerName} onChange = {( {target }) => setEmployerName(target.value)} />
                        </div>
                        <p> Sick Leave: </p>
                        <div>
                            Start Date:
                            <input type ="date" value = {startDate} onChange = {( { target }) => setStartDate(target.value)} />
                        </div>
                        <div>
                            End Date: 
                            <input type ="date" value = {endDate} onChange = {( { target }) => setEndDate(target.value)} />
                        </div>
                    </>
                }
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default HealthEntryForm;
