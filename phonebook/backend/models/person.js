import mongoose from 'mongoose'

const url = process.env.MONGODB_URI

console.log(`Connecting to ${url}...`)
mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

const phoneBookSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: string => /^\d{2}(\d{1})?-\d+$/.test(string),
            message: props => `${props.value} is not a valid phone number.`
        }
    },
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', phoneBookSchema)

export default Person
