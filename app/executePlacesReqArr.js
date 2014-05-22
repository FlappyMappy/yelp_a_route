//Function takes an array of Google Places 
//request functions and executes each one
//in order with a time delay

//When each request returns 
//callback called with (results, pagination)



function executePlacesReqArr(reqArr, callback){
	
	function makeReq(){

		reqArr.shift()(callback);

		if(reqArr.length>0){
			setTimeout(function(){
				makeReq();
			},500);
		};
	};

	makeReq();
};