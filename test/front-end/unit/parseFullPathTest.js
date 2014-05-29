var expect = require('chai').expect
var parseFullPath = require('../../../app/parseFullPath');
var polyline = require('./mocks/polyline');
var polylineMileSplit = require('../../../app/polylineMileSplit');

describe("Test Polyline Parse and Split", function() {
  var parsedResult;
  var splitResult;
  before(function(){
    parsedResult = parseFullPath(polyline.routes[0]);
    splitResult = polylineMileSplit(parsedResult, 0, 10);
  });

  it('test that result of parseFullPath is an array', function() {
    expect(Array.isArray(parsedResult)).to.be.true;
  });

  it('test that result of parseFullPath has properties "A" and "k" representing lat and lng', function() {
    expect(parsedResult[0]).to.have.property('A');
    expect(parsedResult[0]).to.have.property('k');
  });

  it('test that result of polylineMileSplit is an array', function() {
    expect(Array.isArray(splitResult)).to.be.true;
  });

  it('test that result of polylineMileSplit has properties "A" and "k" representing lat and lng', function() {
    expect(splitResult[0]).to.have.property('A');
    expect(splitResult[0]).to.have.property('k');
  });

  it('test that result of polyline mile split is shorter than parse full path', function() {
    expect(splitResult.length).to.be.below(parsedResult.length);
  });

});
