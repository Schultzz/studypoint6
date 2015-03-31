/**
 * Created by MS on 27-03-2015.
 */
/**
 * Created by MS on 26-03-2015.
 */
var mongoose = require("mongoose");
var Todo = require("./Todo");


var newData = new Todo({name: 'Lars', completed: true, note: 'not much to note',
update_at: { type: new Date(), default: new Date()}});

newData.save(function (err, data) {
    if (err) return console.error(err);
    console.log(data + ' saved');
});

var newData1 = new Todo({name: 'Henning', completed: true, note: 'not much to note',
    update_at: { type: new Date(), default: new Date()}});

newData1.save(function (err, data) {
    if (err) return console.error(err);
    console.log(data + ' saved');
});