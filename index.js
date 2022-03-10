const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//const Static = mongoose.model('Static',  Recipe);

// Connection to the database "recipe-app"
// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/recipe-app");
//   console.log(mongoose.connection.collections);
// };
// main();

function printTitle(arr){
    for(let i = 0; i < arr.length; i++){
      console.log(arr[i].title);
    }
}

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((arr) => { 
    //          .CREATE METHODE
    // Recipe.create({ title: 'Ramen', cuisine: true,})
    //console.log({title: 'Ramen'})

            // BY CREATING A CONST
    const Pasta = new Recipe({
      title: 'Pasta',
      cuisine: true,
    })       
    Pasta.save(); 
    console.log(Pasta.title);
  })
  .then(()=>{
    return Recipe.insertMany(data);
    printTitle(data);

  })
  //const change = Recipe.find({title: "Rigatoni alla Genovese"})
  .then(()=>{ 
    return Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {duration: 100})
    }).then(()=>{
      console.log("Update")
    }).then(()=>{
      return Recipe.deleteOne({title: "Carrot Cake"})
    }).then(()=>{
      console.log("Delete");
    }).then(()=>{
      mongoose.connection.close();
    })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


