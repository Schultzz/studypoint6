
var mongoose = require("mongoose");
var facade = require("../model/userFacade");
//tell Mongoose to use a different DB - created on the fly
var db = require('./dbTest');
var should = require('should');

describe("users", function(){

    var user = null;

    beforeEach(function(done){
        //add some test data
        facade.addUser('Lars','test123', function(elem){
            user = elem;
            done()
        });

    });

    afterEach(function(done){
        facade.model.remove({}, function() {
            done();
        });
    });


    it('should return the added user, and the lenght should be 2', function(done){

        facade.addUser('Henrik','test',function(elem){
           elem.username.should.equal('Henrik');
            elem.password.should.equal('test');
            facade.countUser(function(count){
                count.should.equal(2);
                done()
            })
        });

    });

    it('should find a user and check password, return it correct',function(done){

        facade.validate('Lars',function(elem){
            elem.password.should.equal(elem.password);
            done();
        });

    });

    it('should return 1, there are 1 user in the db', function(done){
        facade.countUser(function(count){
            count.should.equal(1);
            done()
        })
    })

});