const Person = ({ person, handleDeleteContact }) => {
    return (
        <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
                <button onClick={handleDeleteContact}>Delete</button>
            </td>
        </tr>
    )
}

export default Person