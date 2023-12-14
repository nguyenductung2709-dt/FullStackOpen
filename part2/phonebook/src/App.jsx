import personsService from './services/persons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import NameNotification from './components/nameNotification'
import ErrorNotification from './components/errorNotification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newText, setNewText] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      const existingPerson = persons.find(person => person.name == newName);
      const idOfExisted = existingPerson.id;
      const message = `${newName} is already added to phonebook, replace the old number with a new one`;
      const confirmed = window.confirm(`${message}`);
      if (confirmed) {
        const changedPerson = { ...existingPerson, number: newNumber }; // Update the number
        personsService
          .update(idOfExisted, changedPerson)
          .then(() => {
            const updatedPersons = persons.map(person =>
              person.id !== idOfExisted ? person : changedPerson
            );
            setPersons(updatedPersons);
            setNewName('');
            setNewNumber('');
            setAddedMessage(
              `Changed ${changedPerson.name}'s number`
            )
            setTimeout(() => {
              setAddedMessage(null)
            }, 2000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${changedPerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
          });
      }
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
      setAddedMessage(
        `Added ${noteObject.name}`
      )
      setTimeout(() => {
        setAddedMessage(null)
      }, 2000)
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
      <NameNotification message={addedMessage} />
      <ErrorNotification message={errorMessage} />
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