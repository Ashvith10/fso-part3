import express from 'express'

const app = express()

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (response, request) => {
    return request.json(persons)
})

app.get('/info', (response, request) => {
    const currentDate = new Date()
    return request.send(
        `<div>
            <div>Phonebook has info for ${persons.length} people</div>
            <div>${currentDate}</div>
        </div>`
    )
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
