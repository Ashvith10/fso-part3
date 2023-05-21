import mongoose from 'mongoose'

if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://tempcrap973:${password}@cluster0.w9lehrj.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', phoneBookSchema)

if (process.argv.length > 3) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(phonebook => {
            console.log(`${phonebook.name} ${phonebook.number}`)
        })
        mongoose.connection.close()
    })
}
