import CountryDetail from "./CountryDetail"

const CountriesList = ({ countriesToShow, showCountryDetail }) => {
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
                                {c.name.common}<br />
                            </>}
                    </>
                )
            })}
        </>
    )
}

export default CountriesList