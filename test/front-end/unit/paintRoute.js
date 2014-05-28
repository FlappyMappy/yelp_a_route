var calcRoute = require('../../../app/calcRoute');
var MapObject = require('../../../app/MapObject');
var paintRoute = require('../../../app/paintRoute');
var expect = require('chai').expect

var element = document.getElementById("map");

describe("paintRoute", function() {
  var result;
  var callback;
  var routeRenderer;

  before(function(done){
    mapObject = new MapObject(element);
    callback = function (res) {
      result = res;
      done();
    };
    result = calcRoute("seattle", "tacoma", callback, mapObject.map);
    paintRoute(result, mapObject.routeRenderer);
  });

  it('return is an object', function() {
    expect(result).to.be.an("object");
  });

  it('return destination equals tacoma', function () {
    expect(result.Tb.destination).to.be.equal("tacoma");
  });
});

