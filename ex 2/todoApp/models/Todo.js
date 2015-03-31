/**
 * Created by MS on 26-03-2015.
 */
var mongoose = require( 'mongoose' );
var dbURI = 'mongodb://localhost/person';
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

var TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    note: String,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', TodoSchema)