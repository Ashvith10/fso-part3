import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('../frontend/build'))

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const currentDate = new Date()
    response.send(
        `<div>
            <div>Phonebook has info for ${persons.length} people</div>
            <div>${currentDate}</div>
        </div>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end('Resource not found')
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const newId = Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER)
    const body = request.body
    let error = []

    if (!body.name) {
        error.push("'name' attribute missing from body")
    } else if (persons.find(person => person.name === body.name)) {
        error.push(`Name '${body.name}' already exists`)
    }
    
    if (!body.number) {
        error.push("'number' attribute missing from body")
    }

    if (error.length) {
        return response.status(400).json({error: error})
    } else {
        const person = { id: newId, ...body }
        persons = persons.concat(person)
    
        response.json(person)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
