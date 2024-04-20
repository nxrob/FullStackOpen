import { useEffect, useState } from 'react'
import axios from 'axios'

import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'

import personService from './service/persons'


//****************************-> APP <-********************************
const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [filteredContacts, setFilteredContacts] = useState(persons)

  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons)
      setFilteredContacts(persons)
    })
  }, [])

  const handleAddPerson = (e) => {

    e.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already exists in the phonebook`)
      setNewName('')
    }
    else if (persons.some((person) => person.number === newPhoneNumber)) {
      alert(`The number ${newPhoneNumber} already exists for a contact in your phonebook`)
      setNewPhoneNumber('')
    }
    else {
      const personToAdd = {
        name: newName,
        number: newPhoneNumber
      }
      personService.create(personToAdd).then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewPhoneNumber('')
        if (addedPerson.name.includes(filterString)) {
          setFilteredContacts(filteredContacts.concat(addedPerson))
        }
      })
    }

  }

  const handleFilterInput = (e) => {
    setFilterString(e.target.value)
    setFilteredContacts(persons.filter((person) => person.name.toUpperCase().includes((e.target.value).toUpperCase())))
  }

  // const handleDeleteContact = ()


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter props={{ filterString, handleFilterInput }} />
      <Form states={{ newName, newPhoneNumber }} handlers={{ setNewName, setNewPhoneNumber, handleAddPerson }} />
      <h2>Numbers</h2>
      <Persons filteredContacts={filteredContacts} />
    </div>
  )
}

export default App