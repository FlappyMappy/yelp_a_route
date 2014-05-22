var superagent = require('superagent');
var chai = require('chai'),
	expect = chai.expect,
	should = chai.should();
var app = require('../server.js').app;

describe('Notes JSON api', function() {
	var id;

	//testing the POST function of the JSON API
	it('can successfully create a new note', function(done) {
		superagent.post('http://localhost:3000/api/v0_0_1/notes/')
			.send({body: 'a new note!'})
			.end(function(err, res){
				expect(err).to.eql(null);
				expect(res.body._id).to.not.be.eql(null);
				expect(res.body.body).to.be.eql('a new note!');
				id = res.body._id;

				done();
			});
	});

	//testing the GET function of the JSON API
	it('can succesfully get a note', function(done) {

		superagent.get('http://localhost:3000/api/v0_0_1/notes/' + id)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body._id).to.be.eql(id);
				expect(res.body.body).to.be.eql('a new note!');

				done();
			});
	});

	it('can succesfully update a note', function() {
		superagent.put('http://localhost:3000/api/v0_0_1/notes/' + id)
			.send({
				body: 'an updated note'
			})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body._id).to.be.eql(id);
				expect(res.body.body).to.be.eql('an updated note');

				done();
			});
	});

	it('can succesfully delete a note', function(done) {
		superagent.del('http://localhost:3000/api/v0_0_1/notes/' + id)
			.end(function(err, res) {
				expect(err).to.eql(null);

				done();
			});
	});
});