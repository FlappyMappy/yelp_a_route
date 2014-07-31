"use strict";
/*global google:false */
//Function takes an array of bounding boxes and options and
//returns an array of request functions that accept a callback
//and pass it results and pagination of google places
//
//
//Return [function(callback)] where callback will be passed results, pagination
//Params bboxArray - array of google maps bounding boxes
//Params options - options object for locations search
//Params map - google.maps.Map object

var getReqFunction = require("./getReqFunction");

module.exports = function bboxToPlacesReqArr(bboxArray, options, map){

	var placesService = new google.maps.places.PlacesService(map);

	var reqArr = [];

	var i;

	for (i=0; i<bboxArray.length; i++) {

		//create shallow copy of options
		//and add bounds property
		var reqOptions = {};

		for (var key in options){
			reqOptions[key] = options[key];
		}
		reqOptions.bounds = bboxArray[i];

		var req = getReqFunction(reqOptions, placesService);

		reqArr.push(req);
	}

	return reqArr;
};
