const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    console.log('Imported the recipes');
    return recipes.forEach(recipe => {
      console.log(recipe.title);
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then(book => {
    console.log('Updated Rigatoni alla Genovese', book);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(data => {
    console.log('Deleted carrot cake!', data);
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Diconnected from MongoDB');
  })
  .catch(error => {
    console.error('Something went wrong with one of the operations', error);
  });
