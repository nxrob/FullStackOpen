import { useState } from 'react'

const Filter = ({ props: { filterString, handleFilterInput } }) => {
  return (
    <> Filter: <input value={filterString} onChange={handleFilterInput} /> </>
  )
}

const Form = ({ states, handlers }) => {
  return (
    <>
      <h2>Add a person</h2>
      <form>
        <div>
          name: <input value={states.newName} onChange={(e) => handlers.setNewName(e.target.value)} />
        </div>
        <div>
          phone number: <input value={states.newPhoneNumber} onChange={(e) => handlers.setNewPhoneNumber(e.target.value)} />
          <button type="submit" onClick={handlers.handleAddPerson}>add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({ filteredContacts }) => {
  return (
    filteredContacts.map((person) => <p key={person.name}>{person.name} - {person.phoneNumber}</p>)
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456' },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523' },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345' },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [filteredContacts, setFilteredContacts] = useState(persons)

  const handleAddPerson = (e) => {

    e.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already exists in the phonebook`)
      setNewName('')
    }
    else if (persons.some((person) => person.phoneNumber === newPhoneNumber)) {
      alert(`The number ${newPhoneNumber} already exists for a contact in your phonebook`)
      setNewPhoneNumber('')
    }
    else {
      const personToAdd = {
        name: newName,
        phoneNumber: newPhoneNumber
      }
      setPersons(persons.concat(personToAdd))
      setNewName('')
      setNewPhoneNumber('')
      if (personToAdd.name.includes(filterString)) {
        setFilteredContacts(filteredContacts.concat(personToAdd))
      }
    }

  }

  const handleFilterInput = (e) => {
    setFilterString(e.target.value)
    setFilteredContacts(persons.filter((person) => person.name.toUpperCase().includes((e.target.value).toUpperCase())))
  }


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