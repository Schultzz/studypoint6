var users = function(){
    var mongoose = require('mongoose');
    //the model uses the schema declaration
    var _model = mongoose.model('user');

    var _addUser = function(username, password, callback){
        var newUser = new _model({username: username, password: password});
        newUser.save(function (err, data) {
            if (err) return console.error(err);
            console.log(data);
            callback(data);
        });
    };

    var _countUser = function(callback){

        _model.count().exec(function(err, count){
            if(err) return console.log(err);
            callback(count);

        });
    };

    var _validateUser = function(username, callback){

        var query  = _model.where({ username: username });
        query.findOne(function (err, data) {
            if (err) return console.log(err);

            if (data) {
                console.log(data + "data here");
                callback(data);
                // doc may be null if no document matched
            }else{
                callback(null);
            }
        });
    };

    return {
        model : _model,
        addUser : _addUser,
        countUser: _countUser,
        validate: _validateUser
    }
}();

module.exports = users;