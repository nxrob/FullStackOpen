import { useEffect, useState } from "react"
import countriesService from "./service/countriesService"
import CountriesList from "./components/CountriesList"

const CountriesApp = () => {

    const [inputCountry, setInputCountry] = useState("")
    const [selectedCountry, setSelectedCountry] = useState()
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState([])
    const [showCountryDetail, setShowCountryDetail] = useState(false)

    const handleInputCountryChange = (e) => {
        setInputCountry(e.target.value)
    }

    useEffect(() => {
        countriesService.getAll().then(countries => setCountries(countries))
    }, [])

    useEffect(() => {
        const filteredByName = countries.filter(c => c.name.common.toLowerCase().includes(inputCountry.toLowerCase()))
        if (filteredByName.length == 1) {
            setShowCountryDetail(true)
        }
        else {
            setShowCountryDetail(false)
        }
        setCountriesToShow(filteredByName)
        if (!inputCountry) {
            setCountriesToShow()
        }
    }, [inputCountry])

    return (
        <div>
            Find a country...
            <br />
            <input value={inputCountry} onChange={(e) => handleInputCountryChange(e)} />
            <br />
            <CountriesList countriesToShow={countriesToShow} showCountryDetail={showCountryDetail} />
            <br />
        </div>
    )
}

export default CountriesApp