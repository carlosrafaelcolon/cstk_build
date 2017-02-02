

var strikeListQueryBuilder = function StrikeListQueryBuilder (options) {
	var strikeListQuery = {};
	if (Object.keys(options).length) {
		var searchTerms = {};
		
		searchTerms.excludeWeapons = options.excludeWeapons
		searchTerms.excludeReviewed = options.excludeReviewed

		searchTerms.targets = options.targets
			.filter(function(target) {
				return target.selected;
			})
			.map(function(target) {
				return target.country;
			})
		searchTerms.attackers = options.attackers
			.filter(function(attacker) {
				return attacker.selected;
			})
			.map(function(attacker) {
				return attacker.country;
			})
		searchTerms.weaponTypes = options.weaponTypes
			.filter(function(weapon) {
				return weapon.selected;
			})
			.map(function(weapon) {
				return weapon.term;
			})
		searchTerms.actionTypes = options.actionTypes
			.filter(function(action) {
				return action.selected;
			})
			.map(function(action) {
				return action.term;
			})
		
		searchTerms.date = options.dates;
		searchTerms.casualties = options.casualties;
		searchTerms// TODO, remove console.log
	}
	
	
	
	/********************************
	
	Country and weapon search terms
	
	*******************************/
	if (searchTerms) {
		if (searchTerms.targets && searchTerms.targets.length){
			strikeListQuery["countries.targets.country"] = {
				"$in": searchTerms.targets
			};
		}
		if (searchTerms.attackers && searchTerms.attackers.length){
			strikeListQuery["countries.attackers.country"] = {
				"$in": searchTerms.attackers
			};
		}
		if (searchTerms.weaponTypes && searchTerms.weaponTypes.length){
			strikeListQuery["type.weaponTypes.term"] = {
				"$in":searchTerms.weaponTypes
			};
		}
		if (searchTerms.actionTypes && searchTerms.actionTypes.length){
			strikeListQuery["type.actionTypes.term"] = {
				"$in": searchTerms.actionTypes
			};
		}
		if (searchTerms.excludeWeapons === true){
			strikeListQuery["type.weaponTypes.clear"] = {
				"$in":[true]
			};
		}
		if (searchTerms.excludeReviewed === true){
			
			strikeListQuery["reviewed"] = {
				"$in":[false]
			};
		}
		/********************************
		
		Casualty statistic search terms
		
		*******************************/
		
		var addRangeStatQuery = function addRangeStatQuery(obj, querySelector, dateBool) {
			console.log(obj, querySelector);
			//obj is the corresponding nested object in searchTerms
			//querySelector is the property in the database to search against
			//dateBool is true or false depending on whether querying dates
			var min, max;
			if (obj) {
				strikeListQuery[querySelector] = {};
				if (obj.min) {
					min = dateBool ? new Date(obj.min) : obj.min;
					strikeListQuery[querySelector]["$gte"] = min;
				}
				if (obj.max) {
					max = dateBool ? new Date(obj.max) : obj.max;						
					strikeListQuery[querySelector]["$lte"] = max;
				}
			}
		}
		
		if (searchTerms.casualties) {
			addRangeStatQuery(searchTerms.casualties.susMils, "casualties.susMils");
			addRangeStatQuery(searchTerms.casualties.civilians, "casualties.civilians");
			addRangeStatQuery(searchTerms.casualties.unknowns, "casualties.unknowns");
			addRangeStatQuery(searchTerms.casualties.hvts, "casualties.hvts");
		}
		
		addRangeStatQuery(searchTerms.date, "date", true);
		
	}//end conditional that checks if searchTerms exists
	
	return strikeListQuery;
	
};

module.exports = strikeListQueryBuilder;