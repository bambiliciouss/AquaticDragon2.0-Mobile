const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => {
        console.log("Database Connection is ready...");
    }).catch(err => console.log(err));

}

module.exports = connectDatabase 
