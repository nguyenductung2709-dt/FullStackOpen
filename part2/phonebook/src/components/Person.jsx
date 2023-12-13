import React from 'react';

const Person = ({ note }) => {
    return (
    <li>{note.name} {note.number}</li>
    );
  };

export default Person