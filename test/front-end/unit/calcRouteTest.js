var CalcRoute = require('../app/calcRoute');
var expect = require('chai').expect

describe("CalcRoute", function() {
    var calcRoute;
    before(function(){
  calcRoute = new CalcRoute();
    });

  it('returns a result', function() {
    calcRoute();
    expect(calcRoute()).to.return(result)
    });
});
