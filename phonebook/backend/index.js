import './config.js'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Person from './models/person.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('../frontend/build'))

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).json({error: ['Malformatted id']})
    }

    next(error)
}
app.use(errorHandler)

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
})

app.get('/info', (request, response) => {
    Person.countDocuments({})
        .then(count => {
            const currentDate = new Date()
            response.send(
            `<div>
                <div>Phonebook has info for ${count} people</div>
                <div>${currentDate}</div>
            </div>`
            )
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end('Resource not found')
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.deleteOne({_id: request.params.id})
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    let error = []

    if (!body.name) {
        error.push("'name' attribute missing from body")
    }
    
    if (!body.number) {
        error.push("'number' attribute missing from body")
    }

    if (error.length) {
        response.status(400).json({error: error})
    } else {
        const person = new Person({...body})
        person.save()
            .then(savedPerson => {
                response.json(person)
            })
    }
})

app.put('/api/persons/:id', (request, response) => {
    Person.findByIdAndUpdate(request.params.id, {...request.body}, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
