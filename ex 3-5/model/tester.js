/**
 * Created by MS on 26-03-2015.
 */
var db = require("./db");
var mongoose = require("mongoose");
var user = mongoose.model('user');

//
//var newUser = new user({username: 'Lars', password: 'test'});
//
//newUser.save(function (err, data) {
//    if (err) return console.error(err);
//    console.log(data + ' saved');
//});

//var newUser1 = new user({userName: 'Hans', password: 'test1'});
//
//newUser1.save(function (err, data) {
//    if (err) return console.error(err);
//    console.log(data + ' saved');
//});


user.find(function(err, result){
    if(err){
        return console.log(err);
    }else
        console.log(result);
});

