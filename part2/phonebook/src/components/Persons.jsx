import React from 'react';
import Person from './Person';

const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((note) => (
        <Person key={note.id} note={note} />
      ))}
    </ul>
  );
};

export default Persons;