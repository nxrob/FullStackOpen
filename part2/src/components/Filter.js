const Filter = ({ props: { filterString, handleFilterInput } }) => {
    return (
        <> Filter: <input value={filterString} onChange={handleFilterInput} /> </>
    )
}

export default Filter