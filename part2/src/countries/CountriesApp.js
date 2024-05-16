import { useEffect, useState } from "react"
import countriesService from "./service/countriesService"
import CountriesList from "./components/CountriesList"

const CountriesApp = () => {

    const [inputCountry, setInputCountry] = useState("")
    const [selectedCountry, setSelectedCountry] = useState()
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState([])
    const [showCountryDetail, setShowCountryDetail] = useState(false)
    const [msgToUser, setMsgToUser] = useState('')

    const handleInputCountryChange = (e) => {
        setInputCountry(e.target.value)
    }

    useEffect(() => {
        countriesService.getAll().then(countries => setCountries(countries))
    }, [])

    useEffect(() => {
        const filteredByName = countries.filter(c => c.name.common.toLowerCase().startsWith(inputCountry.toLowerCase()))
        setMsgToUser('')
        //If no countries matched
        if (filteredByName.length == 0) {
            setShowCountryDetail(false)
            setCountriesToShow()
            setMsgToUser('No countries found')
        }
        //If one specific country matched
        if (filteredByName.length == 1) {
            setShowCountryDetail(true)
            setCountriesToShow(filteredByName)
        }
        //If too many countries matched
        else if (filteredByName.length > 10) {
            setShowCountryDetail(false)
            setCountriesToShow()
            setMsgToUser('Too many countries')
        }
        //If matched between 1 and 10 countries
        else {
            setShowCountryDetail(false)
            setCountriesToShow(filteredByName)
        }
        //If no input
        if (!inputCountry) {
            setCountriesToShow()
            setMsgToUser('')
        }
    }, [inputCountry])

    const showCountry = (countryName) => {
        const country = countries.filter(c => c.name.common == countryName)
        setCountriesToShow(country)
        setShowCountryDetail(true)
    }

    return (
        <div>
            Find a country...
            <br />
            <input value={inputCountry} onChange={(e) => handleInputCountryChange(e)} />
            <br />
            {msgToUser && <p>{msgToUser}</p>}
            <CountriesList countriesToShow={countriesToShow} showCountryDetail={showCountryDetail} showCountry={showCountry}/>
            <br />
        </div>
    )
}

export default CountriesApp