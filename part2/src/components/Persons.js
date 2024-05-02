import Person from "./Person"

const Persons = ({ filteredContacts, handleDeleteContact }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredContacts.map((person) =>
                    <Person key={person.id}
                            person={person}
                            handleDeleteContact={() => handleDeleteContact(person)}/>
                )}
            </tbody>
        </table>
    )
}

export default Persons