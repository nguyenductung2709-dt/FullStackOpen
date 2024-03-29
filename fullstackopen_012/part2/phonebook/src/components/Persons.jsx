import React from 'react';
import Person from './Person';

const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <ul>
      {filteredPersons.map((note) => (
        <Person key={note.id} note={note} deletePerson = {deletePerson} />
      ))}
    </ul>
  );
};

export default Persons;