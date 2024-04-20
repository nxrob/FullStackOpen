import axios from 'axios'

const getAll = () => {
    const request = axios.get('http://localhost:3001/persons')
    request.then(r => console.log("People fetched: ", r.data))
    return request.then(r => r.data)
}

const create = (person) => {
    const request = axios.post('http://localhost:3001/persons', person)
    request.then(r => console.log("Person created: ", r.data))
    return request.then(r => r.data)
}

export default { getAll, create }