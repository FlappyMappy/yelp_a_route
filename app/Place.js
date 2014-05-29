var placesDetailRequest = require('./placesDetailRequest');
var _ = require('underscore');
var template = require('./template.hbs');
var $ = require ("jquery");

module.exports = function Place (placeJSON, mapObject) {
  var that = this;
  this.placeJSON = placeJSON;

  this.marker = new google.maps.Marker({

    // for now, just get the name and location
    position: this.placeJSON.geometry.location,
    title: this.placeJSON.name,
    map: mapObject.map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 3,
      strokeWeight: 1,
      fillOpacity: 1,
      fillColor: "red"
    }
  });

  this.element = "<span class='place_name' id='" + placeJSON.reference + "'>"
                  + placeJSON.name + "</span><br><hr>";

  this.detailRequest = function detailRequest (callback) {
    placesDetailRequest(placeJSON.reference, mapObject.map, callback);
  };

  // add each place to the list display
  $(".list-display").append (this.element);

  // add click functionality to each list item
  $("#" + placeJSON.reference).click (function () {

    // remove any detail blocks already open
    $(".places_details").remove();

    var place = this;
    that.detailRequest (function (result) {

      console.log (result);
      // str.split
      // getElementById
      var temp_string = result.adr_address;
      var short_address = temp_string.split (",");
      $(place).after ("<span class='places_details'>"
                        + "<br>" + short_address[0]
                        + "<br>" + result.formatted_phone_number
                        + "<br>" + result.rating + " / 5 Stars"
                        + "</span>");
    });
  });

  google.maps.event.addListener(this.marker, 'click', function() {

    if (mapObject.openInfoWindow!==null){
      mapObject.openInfoWindow.close();
    };
    that.detailRequest(function(result){
      that.infoWindow = new google.maps.InfoWindow({
        content: template(result)
      });
      mapObject.openInfoWindow = that.infoWindow;
      mapObject.openInfoWindow.open(mapObject.map, that.marker);
    });

  });
};
