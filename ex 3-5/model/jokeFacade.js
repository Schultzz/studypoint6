
var jokes = function(){
    var mongoose = require('mongoose');
    //the model uses the schema declaration
    var _model = mongoose.model('jokes');

    var _addJoke = function(joke, callback){
        var newJoke = new _model({joke: joke});
        newJoke.save(function (err, data) {
            if (err) return console.error(err);
            callback(data);
        });
    };

    var _allJokes = function(callback){

       _model.find(function(err, result){
            if(err){
                return console.log(err);
            }else
                callback(result);
        });
    };

    var _getRandomJoke = function(callback){

        _model.count().exec(function(err, count){

            var random = Math.floor(Math.random() * count);

            _model.findOne().skip(random).exec(
                function (err, result) {
                    if(err){return console.log(err)}
                    callback(result);
                });
        });
    };

    return {
        model : _model,
        allJokes : _allJokes,
        ranJoke : _getRandomJoke,
        addJoke : _addJoke
    }
}();

module.exports = jokes;

