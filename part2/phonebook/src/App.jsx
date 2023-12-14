import personsService from './services/persons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newText, setNewText] = useState('')

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const isNameExists = persons.some(person => person.name === newName);
    if (isNameExists) {
      const message = `${newName} is already added to phonebook`;
      alert(message);
    }
    else {
    const noteObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    personsService
    .create(noteObject)
    .then(returnedPersons => {
      setPersons(persons.concat(returnedPersons))
      setNewName('')
      setNewNumber('')
    })
  }
  }

  const deletePerson = (name, id) => {
    const confirmed = window.confirm(`Delete ${name} ?`);
    if (confirmed){
    const url = `http://localhost:3001/persons/${id}`
    personsService.eliminate(url).then(() => {
      const updatedPersons = persons.filter((person) => person.id !== id);
      setPersons(updatedPersons);
    })
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
        deletePerson = {deletePerson}
        filteredPersons = {filteredPersons}
        />
    </div>
  )
}

export default App