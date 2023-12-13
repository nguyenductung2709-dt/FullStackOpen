import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

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
      <Filter
        newText = {newText}
        handleNewText={handleNewText} 
      />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons
        filteredPersons = {filteredPersons}
        />
    </div>
  )
}

export default App