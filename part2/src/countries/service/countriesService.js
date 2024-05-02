import axios from "axios"

const getAll = () => {
    const response = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return response.then(r => r.data)
}

export default { getAll }