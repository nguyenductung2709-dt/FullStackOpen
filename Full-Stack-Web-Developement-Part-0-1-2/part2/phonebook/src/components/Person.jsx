import React from 'react';

const Person = ({ note, deletePerson }) => {
  return (
    <li>
      {note.name} {note.number}  <></>
      <button onClick={() => deletePerson(note.name, note.id)}>Delete</button>
    </li>
  );
};

export default Person