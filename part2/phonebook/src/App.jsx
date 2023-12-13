import { useState } from 'react'

const Part = ({ note }) => {
  return (
  <li>{note.name} {note.number}</li>
  );
};

const App = () => {
  const details = [
    { id : 1,
      name: 'Arto Hellas', 
      number: '040-123456'
    },
  ]
  const [persons, setPersons] = useState(details) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newText, setNewText] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const isNameExists = persons.some(person => person.name === newName);
    if (isNameExists) {
      const message = `${newName} is already added to phonebook`;
      alert(message);
    }
    else {
    const noteObject = {
      id : details.length + 1,
      name: newName,
      number: newNumber 
    }
    setPersons(details.concat(noteObject))
    setNewName('')
    setNewNumber('')
  }
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newText.toLowerCase())
  );


  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewText = (event) => {
    setNewText(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input
          value = {newText}
          onChange = {handleNewText}
        /> </div>
      <h2>add a new</h2>
      <form onSubmit = {addPerson}>
        <div>name: <input
          value = {newName}
          onChange = {handleNewName}
        /> </div>
        <div>number: <input
          value = {newNumber}
          onChange = {handleNewNumber}
        /> </div>
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((note) => (
          <Part key={note.id} note={note} />
        ))}
      </ul>

    </div>
  )
}

export default App