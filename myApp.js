require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const handler = (done) => (error, data) => {
  if(error) {
    return console.error(error);
  };
  done(null, data);
};

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
  newPerson.save(handler(done));
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, handler(done));
};

const findPeopleByName = async (personName, done) => {
  Person.find({ name: personName }, handler(done))
};

const findOneByFood = (favoriteFoods, done) => {
  Person.findOne({ favoriteFoods }, handler(done));
};

const findPersonById = (personId, done) => {
  Person.findById(personId, handler(done));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, person) => {
      if(error) return console.error(error);
      person.favoriteFoods.push(foodToAdd);
      person.save(handler(done))
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true}, handler(done))
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, handler(done))
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
