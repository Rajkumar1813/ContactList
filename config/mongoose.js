//  require the library
const mongoose = require('mongoose');

//  connect to the db      
mongoose.connect('mongodb://0.0.0.0/contact_list_bd');

//  asquire the connection ( to check if it is successfully..)
const db = mongoose.connection;

//   error
db.on('error',console.error.bind(console, "Db is NOT connected"));

//  connect success to print message..
db.once('open', ()=>{
    console.log("db is connected successfully.");
}); 



//  ky krna h sir   ok thik h ap resclate kr do