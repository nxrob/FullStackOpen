import axios from 'axios'

const getAll = () => {
    const request = axios.get('http://localhost:3001/persons')
    return request.then(r => r.data)
}

const create = (person) => {
    const request = axios.post('http://localhost:3001/persons', person)
    return request.then(r => r.data)
}

const deleteContact = (person) => {
    const request = axios.delete(`http://localhost:3001/persons/${person.id}`)
    return request.then(() => console.log("deleted"))
}

const update = (person) => {
    const request = axios.put(`http://localhost:3001/persons/${person.id}`, person)
    return request.then(r => r.data)
}

export default { getAll, create, deleteContact, update }