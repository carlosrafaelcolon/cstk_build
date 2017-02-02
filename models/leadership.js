'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// model for specific statement within cases
var StatementSchema = new Schema({
	stype:String,
    statement:String,
    civKill:{type: Boolean, default: false},
    hvtKill:{type: Boolean, default: false},
    medium:String,
    scite:String,
    slink:String
});

// model for specific cases within leaders
var CaseSchema = new Schema({
	cid:Number,
  	strikeDate:Date,
  	attacker:[  
        {  
          country:{type: String, default: "United States"},
          contested:{type: Boolean, default: false}
        }
  	],
  	country:{type: String, default: "Pakistan"},
  	region:String,
  	location:String,
  	weapon:[  
	    {  
	      type:{type: String, default: "UAV"},
	      contested:{type: Boolean, default: false},
	      description: String
	    }
  	],
  	action:[  
	    {  
	      type:{type: String, default: "Airstrike"},
	      contested:{type: Boolean, default: false},
	      description: String
	    }
  	],
  	object:[  
	    {  
	      type:{ type : String },
	      contested:{type: Boolean, default: false},
	      description: String
	    }
  	],
  	extendedDamage: {
  		beyondTarget: {type: Boolean, default: false},
  		extent: {type: String, default: "No additional damage"},
  		description: String
  	},
  	decapitation:{type: Boolean, default: true}, // Kill = true && capture = false
  	successful:{type: Boolean, default: true},
  	result:{type: String, default: "Target Killed"},
  	time:{type: String, default: "Unclear"},
  	summary: {type: String, default: "In Progress"},
  	civKill:{type: Boolean, default: false},
  	unkKill:{type: Boolean, default: false},
  	casualties:{  
		total_low:{type: Number, default: 0},
		total_high:{type: Number, default: 0},
	    civ_low:{type: Number, default: 0},
	    civ_high:{type: Number, default: 0},
	    unk_low:{type: Number, default: 0},
	    unk_high:{type: Number, default: 0},
	    mil_low:{type: Number, default: 0},
	    mil_high:{type: Number, default: 0},
	    injured:{type: Number, default: 0}
  	},
  	foreignCited: {type: Boolean, default: false},
  	hostCited: {type: Boolean, default: false},
  	localCited: {type: Boolean, default: false},
  	militantCited: {type: Boolean, default: false},
  	foreignOfficial:{  
        cited:{type: Boolean, default: false},
        statements:[StatementSchema]
  	},
  	hostOfficial:{  
        cited:{type: Boolean, default: false},
        statements:[StatementSchema]
  	},
	locals:{  
        cited:{type: Boolean, default: false},
        statements:[StatementSchema]
  	},
  	militants:{  
        cited:{type: Boolean, default: false},
        statements:[StatementSchema]
  	},
  	unclear:{  
        cited:{type: Boolean, default: false},
        statements:[StatementSchema]
  	}
});

// model for leaders
var LeaderSchema = new Schema({
	lid:Number,
	idKnown: {type: Boolean, default: true},
	lastDecap: Date,
	name:{type: String, default: "Unknown"},
	alias:[{type: String, default: "n/a"}],
	group:String,
	class:String,
	title:{type: String, default: "unclear"},
  	bio:{type: String, default: "In Progress"},
  	bioSources:[  
    	{  
      		title:String,
      		medium:String,
      		link:String
    	}
  	],
  	currentStatus: {type: String, default: "Dead"},
  	priorKnowledge: {type: Boolean, default: true},
  	count:{  
	    total_low:{type: Number, default: 0},
	    total_high:{type: Number, default: 0},
	    civ_low:{type: Number, default: 0},
	    civ_high:{type: Number, default: 0},
	    unk_low:{type: Number, default: 0},
	    unk_high:{type: Number, default: 0},
	    mil_low:{type: Number, default: 0},
	    mil_high:{type: Number, default: 0},
	    injured:{type: Number, default: 0}
	  },
  	category: {type: String, default: "Pakistan"},
  	updatedAt:{type: Date, default: Date.now},
  	cases: [CaseSchema]
});


var Leader = mongoose.model("Leader", LeaderSchema);

module.exports.Leader = Leader;