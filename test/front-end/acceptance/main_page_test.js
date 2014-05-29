'use strict';
/*global casper*/

casper.test.begin('home page', 7, function suite(test) {

  casper.start('http://localhost:3000/', function() {
    test.assertHttpStatus(200);
  });

  casper.then(function(){
    test.assertTitle('FlappyMappy!', 'title is FlappyMappy!');
  });

  casper.then(function() {
    test.assertResourceExists(function (resource) {
      return resource.url.match('background3.png');
    }, 'has background3.png available');
  });

  casper.then(function() {
    test.assertExists('#zoom-map-canvas', 'has #zoom-map-canvas to hold google map');
  });

  casper.then(function() {
    test.assertExists('#list-box', 'has #list-box to hold places results');
  });

  casper.then(function() {
    test.assertVisible('#route-box', 'has #route-box and is visible for entering first request');
  });

  casper.then(function() {

    casper.click('#route-button');

    test.assertNotVisible('#route-box', '#route-box NOT visible after search button clicked');

  });

  casper.run(function(){
    test.done();
  });



});