const mongoose = require('mongoose');
const mongoURI="mongodb://0.0.0.0:27017/inotebook"
// mongoose.connect('mongodb://0.0.0.0:27017/mymainprojectdb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, err => err ? console.log(err) : 
//     console.log('Connected to mainproject database'));
//use either the above mongoose.connect or below connecttomongo to connect
const connectToMongo = ()=> {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
connectToMongo()
