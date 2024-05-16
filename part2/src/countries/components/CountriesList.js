import CountryDetail from "./CountryDetail"

const CountriesList = ({ countriesToShow, showCountryDetail, showCountry }) => {
    return (
        <>
            {countriesToShow && countriesToShow.map(c => {
                return (
                    <>
                        {showCountryDetail ?
                            <>
                                <CountryDetail country={countriesToShow} />
                            </>
                            :
                            <>
                                {c.name.common}
                                <button onClick={() => showCountry(c.name.common)}>Show</button>
                                <br />
                            </>}
                    </>
                )
            })}
        </>
    )
}

export default CountriesList