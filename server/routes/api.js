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
    lastChecked: Object,
    currentSubject: String,
});

const User = mongoose.model('User', userSchema);

sendError = (message, res) => {
    res.json({'error': true, 'message': message});
    res.end();
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}

router.post('/signin', (req, res, next) => {
    User.find({username: req.body.username}, function(err, foundUser){
        if(!err){
            if(foundUser.length === 0){
                sendError('no user', res);
            }else{
                if(foundUser[0].password === req.body.password){
                    res.json({'error': false, 'message': foundUser[0]});
                }else{
                    sendError('user password invalid', res);
                }
            }
        }else{
            sendError(err, res);
        }
    })
})

router.post('/user', (req, res, next) => {
    User.find({username: req.body.username}, function(err, foundUser){
        if(!err){
            if(foundUser.length === 0){
                sendError('no user', res);
            }else{
                res.json({'error': false, 'message': foundUser[0]});
            }
        }else{
            sendError(err, res);
        }
    })
})

router.post('/signup', (req, res, next) => {
    User.find({username: req.body.username}, function(err, foundUsernames){
        if(!err){
            if(foundUsernames.length === 0){
                var subjects = ['Maths', 'English', 'Science'] // so we can choose a random one
                var chosenSubject = subjects[Math.floor(Math.random() * subjects.length)]
                new User({username: req.body.username, password: req.body.password, subjects: subjects, learningLength: 3, lastChecked: {'day': new Date().getDate(), 'month': new Date().getMonth()}, currentSubject: chosenSubject}).save(function (err, user){
                    if(err){
                        sendError('error creating user', res)
                    }else{
                        res.json({'error': false, 'message': user})
                    }
                })
            }else{
                sendError('duplicate', res);
            }
        }
    })
    
});

router.post('/updateaccount', (req, res, next) => {
    User.find({username: req.body.username}, function(err, foundUsers){
        if(foundUsers.length === 0){
            User.findById(mongoose.Types.ObjectId(req.body._id), function(err, foundUser){
                if(!err){
                    var currentSubjects = foundUser.subjects;
                    // console.log(currentSubjects, req.body.subjects)
                    if(arraysEqual(req.body.subjects, currentSubjects)){
                        var currentSubject = req.body.currentSubject;
                        // console.log("don't change current subject")
                    }else{
                        currentSubject = req.body.subjects[Math.floor(Math.random() * req.body.subjects.length)]
                    }
                    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body._id), {username: req.body.username, password: req.body.password, subjects: req.body.subjects, learningLength: req.body.learningLength, lastChecked: {'day': new Date().getDate(), 'month': new Date().getMonth()}, currentSubject: currentSubject}, {new: true}, (err, updatedUser) => {
                        if(!err){
                            res.json({'error': false, 'message': updatedUser})
                        }else{
                            sendError('unexpected error updating user', res)
                        }
                    })
                }else{
                    console.log(err);
                }
            })
        }else{
            console.log(req.body._id)
            if(foundUsers[0]._id == req.body._id){ // it's the user updating there own account
                User.findById(mongoose.Types.ObjectId(req.body._id), function(err, foundUser){
                    if(!err){
                        var currentSubjects = foundUser.subjects;
                        // console.log(currentSubjects, req.body.subjects)
                        if(arraysEqual(req.body.subjects, currentSubjects)){
                            var currentSubject = req.body.currentSubject;
                            // console.log("don't change current subject")
                        }else{
                            currentSubject = req.body.subjects[Math.floor(Math.random() * req.body.subjects.length)]
                        }
                        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body._id), {username: req.body.username, password: req.body.password, subjects: req.body.subjects, learningLength: req.body.learningLength, lastChecked: {'day': new Date().getDate(), 'month': new Date().getMonth()}, currentSubject: currentSubject}, {new: true}, (err, updatedUser) => {
                            if(!err){
                                res.json({'error': false, 'message': updatedUser})
                            }else{
                                sendError('unexpected error updating user', res)
                            }
                        })
                    }else{
                        console.log(err);
                    }
                })

            }else{
                // console.log(foundUsers[0]._id)
                sendError('duplicate', res);
            }
        }
    })
    
})

module.exports = router;