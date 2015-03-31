var express = require('express');
var router = express.Router();

var joke = require('../model/jokeFacade');
var user = require('../model/userFacade');
var jokes = require('../model/db');




/* GET home page. */
router.get('/', function(req, res, next) {
    var username = req.session.username;
    res.render('index', { title: 'Express', username: username});
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/joke', function(req, res, next){
    joke.ranJoke(function(elem){
       res.render('singleJoke', {joke: elem.joke});
    })
});

router.get('/jokes', function(req, res, next){

    var temp = [];

    joke.allJokes(function(elem){
        elem.forEach(function(e){
            temp.push(e.joke);

        })
        res.render('joke', {jokes: temp})
    })

});

router.get('/addJoke', function(req, res, next){
    res.render('addJoke')
})

router.post('/storeJoke', function(req, res, next) {
    console.log(req.body.joke);

    joke.addJoke(req.body.joke,function(elem){
        console.log(elem + ' added')
        res.redirect("/addJoke");
    });

    });

router.get('/addUser', function(req, res, next){
    res.render('addUser');
})

router.post('/storeUser', function(req, res, next){

    user.addUser(req.body.username, req.body.password, function(elem){
        res.redirect('/addUser');
    });


});

module.exports = router;
