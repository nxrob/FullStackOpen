const Form = ({ states, handlers }) => {
    return (
        <>
            <h2>Add a person</h2>
            <form>
                <div>
                    name: <input value={states.newName} onChange={(e) => handlers.setNewName(e.target.value)} />
                </div>
                <div>
                    phone number: <input value={states.newPhoneNumber} onChange={(e) => handlers.setNewPhoneNumber(e.target.value)} />
                    <button type="submit" onClick={handlers.handleAddPerson}>add</button>
                </div>
            </form>
        </>
    )
}

  export default Form