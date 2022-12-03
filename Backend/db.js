const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const connectToMongo = async () => {
// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/Movieflix', {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
}

module.exports = connectToMongo;