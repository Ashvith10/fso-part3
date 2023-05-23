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
    name: String,
    number: String,
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
