var calcRoute = require('../../../app/calcRoute');
var MapObject = require('../../../app/MapObject');
var expect = require('chai').expect

describe("CalcRoute", function() {
  var result;
  var callback;
  before(function(){
    mapObject = new MapObject;
    callback = function (res) {
      result = res;
    };
    calcRoute("seattle", "tacoma", callback, mapObject.map);
  });

  it('return is an object', function() {
   expect(result).to.be.a("object");
 });

  it('return destination equals tacoma', function () {
  expect(result.Tb.destination).to.be.equal("tacoma");
  });
});

//mock a start and an end, make a mock request and test the results should equal etc.
