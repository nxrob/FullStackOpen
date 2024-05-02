const CountryDetail = (props) => {
    const country = props.country[0]

    return (
        <>
            <h1>{country.name.common}</h1>
            <img src={country.flags.png} /><br/>
            <b>Capital:</b> {country.capital} <br />
            <b>Population:</b> {country.population} <br />
            <b>Languages:</b>
            <ul>
                {Object.values(country.languages).map(l => <li>{l}</li>)}
            </ul>
        </>
    )
}

export default CountryDetail