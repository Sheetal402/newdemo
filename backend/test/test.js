const chai = require('chai');
const mongoose = require('mongoose');
const assert = require('assert');
const { log } = require('console');
const todo = require('../database/models/todo');

// Require the dev-dependencies
const expect = chai.expect();
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../routes/todo');

chai.use(chaiHttp);

describe("Main test", () => {
    before(() => {
        console.log("This part executes once before all tests");
    });
    after(() => {
        console.log("This part executes once after all tests");
    });
    describe( "test1", () => {
        beforeEach(() => {
            console.log("executes before every test");
        });
        it("Is returning 5 when adding 2 + 3", () => {
            assert.equal(2+3,5);
        })
        describe("/GET comments", function() {
            it("should get all comments", ()=> {
                chai.request(server)
                    .get('/')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                });
            });
        });
        describe('/Search text in comments', function() {
            it("should search in comments", () => {
                chai.request(server)
                    .get('/search/Third')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                })
            });
            it("Cannot find searched text in comments", () => {
                chai.request(server)
                    .get('/search/zewled')
                    .end((err,res) => {
                        expect(res).equals(' ');
                    })
            });
        });
    });
});