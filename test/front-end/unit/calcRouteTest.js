var calcRoute = require('../../../app/calcRoute');
var MapObject = require('../../../app/MapObject');
var expect = require('chai').expect

var element = document.getElementById("map");

describe("CalcRoute", function() {
  var result;
  var callback;

  before(function(done){
    mapObject = new MapObject(element);
    callback = function (res) {
      result = res;
        done();
    };
    calcRoute("seattle", "tacoma", callback, mapObject.map);
  });

  it('return is an object', function() {
    expect(result).to.be.an("object");
  });

  it('return destination equals tacoma', function () {
    expect(result.Tb.destination).to.be.equal("tacoma");
  });
});

