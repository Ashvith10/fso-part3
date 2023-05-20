const Persons = ({persons, searchToken, deletePerson}) => {
    return (
        <div>
            {
                persons
                    .filter((person) => {
                        return person.name
                            .toLowerCase()
                            .includes(searchToken.toLowerCase())
                    })
                    .map((person, id) => {
                        return (
                            <div key={id} id={id}>
                                {person.name} {person.number} <button onClick={deletePerson}>delete</button>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default Persons
