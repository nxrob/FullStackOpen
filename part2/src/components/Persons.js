const Persons = ({ filteredContacts, handleDeleteContact }) => {
    console.log("Filtered: ", filteredContacts.map(p => p.name))
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                </tr>
            </thead>
            <tbody>
                {filteredContacts.map((person) => {
                    return (
                        <tr>
                            <td>{person.name}</td>
                            <td>{person.number}</td>
                            <td><button onClick={handleDeleteContact}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Persons