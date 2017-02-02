

var nameListQueryBuilder = function NameListQueryBuilder (options) {
	var nameListQuery = {};
	if (Object.keys(options).length) {
		var searchTerms = {};
		
		searchTerms.peopleReported = options.peopleReported

		searchTerms// TODO, remove console.log
	}
	
	
	
	/********************************
	
	Country and weapon search terms
	
	*******************************/
	if (searchTerms) {


		if (searchTerms.peopleReported === true){
			
			nameListQuery["peopleReported"] = {
				"$in":[true]
			};
		}

		/********************************
		
		Casualty statistic search terms
		
		*******************************/
		
		// var addRangeStatQuery = function addRangeStatQuery(obj, querySelector, dateBool) {
		// 	console.log(obj, querySelector);
		// 	//obj is the corresponding nested object in searchTerms
		// 	//querySelector is the property in the database to search against
		// 	//dateBool is true or false depending on whether querying dates
		// 	var min, max;
		// 	if (obj) {
		// 		nameListQuery[querySelector] = {};
		// 		if (obj.min) {
		// 			min = dateBool ? new Date(obj.min) : obj.min;
		// 			nameListQuery[querySelector]["$gte"] = min;
		// 		}
		// 		if (obj.max) {
		// 			max = dateBool ? new Date(obj.max) : obj.max;						
		// 			nameListQuery[querySelector]["$lte"] = max;
		// 		}
		// 	}
		// }
		
		// if (searchTerms.casualties) {
		// 	addRangeStatQuery(searchTerms.casualties.susMils, "casualties.susMils");
		// 	addRangeStatQuery(searchTerms.casualties.civilians, "casualties.civilians");
		// 	addRangeStatQuery(searchTerms.casualties.unknowns, "casualties.unknowns");
		// 	addRangeStatQuery(searchTerms.casualties.hvts, "casualties.hvts");
		// }
		
		// addRangeStatQuery(searchTerms.date, "date", true);
		
	}//end conditional that checks if searchTerms exists
	
	return nameListQuery;
	
};

module.exports = nameListQueryBuilder;