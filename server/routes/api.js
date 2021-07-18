var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
mongoose.connect('mongodb://localhost:27017/learNine', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log('connected to database on mongodb://localhost:27017/learNine');
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    subjects: Array,
    learningLength: Number,
});

error = (message, res) => {
    res.json({'error': true, 'message': message});
    res.end();
}

router.post('/user', (req, res, next) => {
    res.json({})
})

router.post('/', (req, res, next) => {
    res.json({});
})

module.exports = router;