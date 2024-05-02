import { useEffect, useState } from 'react'

import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './service/persons'

import './index.css'


//****************************-> APP <-********************************
const App = () => {

  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [filteredContacts, setFilteredContacts] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons)
      setFilteredContacts(persons)
    })
  }, [])

  useEffect(() => {
    if (persons) {
      setFilteredContacts(persons.filter(p => p.name.toUpperCase().includes(filterString.toUpperCase())))
    }
  }, [persons])

  const handleAddPerson = (e) => {

    e.preventDefault()
    if (persons.some(p => p.name === newName)) {
      if (window.confirm(`${newName} already exists in the phonebook. Would you like to update their phone number?`)) {
        const personToUpdate = persons.find(p => p.name === newName)
        const updatedPerson = { ...personToUpdate, number: newPhoneNumber }
        personService.update(updatedPerson)
          .then(() => {
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
            setNewName('')
            setNewPhoneNumber('')
            setNotificationMessage(`Succesfully updated ${updatedPerson.name}'s number`)
            setNotificationType('success')
            setTimeout(() => setNotificationMessage(null), 5000)
          })
          .catch(() => {
            setNotificationMessage(`Error updating ${updatedPerson.name}'s number`)
            setNotificationType('error')
            setTimeout(() => setNotificationMessage(null), 5000)
          })
      }
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
      })
    }

  }

  const handleDeleteContact = person => {
    if (window.confirm(`Are you sure you want to delete ${person.name} from your phonebook?`)) {
      personService.deleteContact(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setFilteredContacts(persons.filter(p => p.id !== person.id))
          setNotificationMessage(`${person.name} was deleted from the phonebook.`)
          setNotificationType('success')
          setTimeout(() => setNotificationMessage(null), 5000)
        })
        .catch(e => {
          setNotificationMessage(`${person.name} was not able to be deleted.`)
          setNotificationType('error')
          setTimeout(() => setNotificationMessage(null), 5000)
        })
    }
  }

  const handleFilterInput = (e) => {
    setFilterString(e.target.value)
    setFilteredContacts(persons.filter((person) => person.name.toUpperCase().includes((e.target.value).toUpperCase())))
  }

  const addDummyPerson = () => {
    const dummyPerson = {
      name: 'Boberta Babbage',
      number: '123-456-7890'
    }
    setPersons(persons.concat(dummyPerson))
  }


  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />
      <h2>Phonebook</h2>
      <Filter props={{ filterString, handleFilterInput }} />
      <Form states={{ newName, newPhoneNumber }} handlers={{ setNewName, setNewPhoneNumber, handleAddPerson }} />
      <h2>Numbers</h2>
      {persons && <Persons filteredContacts={filteredContacts} handleDeleteContact={handleDeleteContact} />}
      <button onClick={addDummyPerson}>Add dummy person</button>
    </div>
  )
}

export default App