var parseFullPath = require('../../../app/parseFullPath');
var polyline = require('./mocks/polyline');

console.log("polyline is " + polyline);

describe("Test parse full path", function() {
  var result;
  before(function(){
    result = parseFullPath(polyline.routes[0], 0, 10);
    console.dir(result);
  });

  it('test that result is an array', function() {
    expect(Array.isArray(result)).to.be.true;
  });

  it('test that result has properties "A" and "k" representing lat and lng', function() {
    expect(result[0]).to.have.property('A');
    expect(result[0]).to.have.property('k');
  });
});

