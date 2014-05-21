// Updated to handle a single buffer request per call.

// parse_places_array is called once for each google places request (once for each bounding box).
// json_array will be an array with each cell containing a json string, representing one place.

function parse_places_array (json_array)
  {
  var places_data = new Array();  // an array of objects to hold the result data

  // run through the string array
  for (var place_index = 0; place_index < json_array[request_index].length; place_index += 1)
    places_data.push (JSON.parse (json_array[json_index]));  // convert each string into an object

  return places_data;
  }
