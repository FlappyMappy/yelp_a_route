// plot_places takes an array of objects (parsed from the google json)
// and uses each object's "lat" and "lng" to create an array of map markers.

function plot_places (places_data)
  {
  var marker = new Array();  // the array to hold the map marker data
  var total_markers = 0;     // total markers in our array so far

  // run through each place, saving the relevent data to a new marker as we go
  for (var place_index = 0; place_index < places_data.length; place_index += 1)
    {
    var place = places_data[place_index];  // for less typing
    var m = total_markers;                 // also for less typing

    marker[m] = new google.maps.Marker (
      {
      // for now, just get the name and location
      position: new google.maps.LatLng (place.geometry.location.lat,
                                        place.geometry.location.lng),
      title: = place.name
      });
    }
  }
