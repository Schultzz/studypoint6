/**
 * Created by Morten on 30/03/15.
 */
var mongoose = require("mongoose");
var facade = require("../model/jokeFacade");
//tell Mongoose to use a different DB - created on the fly
var db = require('./dbTest');
var should = require('should');

describe("jokes", function(){
    var dbJokes = null;

    beforeEach(function(done){
        //add some test data
        facade.addJoke('joke no0', function(elem){
        });
        facade.addJoke('joke no1', function(elem){
            facade.allJokes(function(e){
                dbJokes  = e;
                done();
            });

        });

    });

    afterEach(function(done){
        facade.model.remove({}, function() {
            done();
        });
    });


    it('should return the added joke, and lenght should be 3',function(done){
        facade.addJoke('joke no2', function(elem){
            elem.joke.should.eql('joke no2');

            facade.allJokes(function(e){
                e.should.have.length(3);
                done();
            })

        })

    });

    it('should get a random joke from the DB', function(done){

        facade.ranJoke(function(elem){
            dbJokes.should.containEql(elem);
            done()
        })

    });

    it('should return all the jokes in the db', function(done){

        facade.allJokes(function(elem){

            elem.should.eql(dbJokes);
            done();

        });

    });


});