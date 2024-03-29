const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required:true,
  },
  number: {
    type: String,
    required: [true, 'User phone number required'],
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{7,}$/.test(v)
      },
      message: 'Please enter a valid phone number in the format XX-XXXXXXXX.',
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
/*const Person = mongoose.model('Person', personSchema)

    Person.find({}).then((persons) => {
      console.log('phonebook:');
      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });/*

/*
else if (process.argv.length === 5) {
    const newName = process.argv[3];
    const newNumber = process.argv[4];

    const person = new Person({
      name: newName,
      number: newNumber,
    });

    person.save().then(() => {
      console.log(`added ${newName} number ${newNumber} to phonebook`);
      mongoose.connection.close();
    });
  } else {
    console.log('Invalid number of arguments!');
    mongoose.connection.close();
  }*/


module.exports = mongoose.model('Person', personSchema)