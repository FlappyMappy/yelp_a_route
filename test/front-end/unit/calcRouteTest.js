var CalcRoute = require('../../../app/calcRoute');
var expect = require('chai').expect

describe("CalcRoute", function() {
  var calcRoute;
  var result;
  before(function(){
    calcRoute = new CalcRoute();
    result = calcRoute("seattle", "tacoma", callback, map);
  });

  it('return is an object', function() {
   expect(result.to.be.equal({}));
 });

  it('')
  expect(result.Tb.destination).to.be.equal("tacoma"));
});

//mock a start and an end, make a mock request and test the results should equal etc.
