var mongoose = require( 'mongoose' );
//localhost
//var dbURI = 'mongodb://localhost/testDB';

//mongolab
var dbURI = "mongodb://schultz:qwerty@ds059471.mongolab.com:59471/test_db";

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});


var jokeSchema = new mongoose.Schema(
    {
        joke: String,
        created: {type: Date, default: new Date()}
    }

);


var userScheme = new mongoose.Schema(
    {
        username: String,
        password: String
    }

);

var _Jokes = mongoose.model('jokes', jokeSchema);

var _Users = mongoose.model('user', userScheme);

