const PersonForm = ({newName, handleNameInput, newNumber, handleNumberInput, addPerson}) => {
    return (
        <form>
            <div>
                name: <input type="textbox" value={newName} onChange={handleNameInput} />
            </div>
            <div>
                number: <input type="textbox" value={newNumber} onChange={handleNumberInput} />
            </div>
            <div>
                <button type="submit" onClick={addPerson}>add</button>
            </div>
        </form>
    )
}

export default PersonForm
