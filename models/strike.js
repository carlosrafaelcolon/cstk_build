'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence');

// model for Strike

var StrikeSchema = new Schema({
    strikeId: {type: Number, unique: true},
    date: Date,
    time: {type: String, default: "Unclear"},
    numStrikes: Number,
    reviewed: {type: Boolean, default: false},
    extended:{type: Boolean, default: false},
    onBorder:{type: Boolean, default: false},
    stateStatus:{type: String, default: "Unclear"},
    countries: {
      attackers: [
        {
          country: String,
          probability: String
        }
      ],
      targets: [
        {
          country: String,
          region: String,
          division: String,
          subdivision: String,
          locale: String
        }
      ]
    },
    type: {
      weaponTypes: [
        {
          term: String,
          clear: Boolean
        }
      ],
      weapons: {
        terms: [String],
        ambiguous:{type: Boolean, default: false}
      },
      actionTypes: [
        {
          term: String,
          clear: Boolean
        }
      ],
      actions: {
        terms: [String],
        ambiguous: {type: Boolean, default: false}
      }
    },
    objects: [
      {
        type: {type: String, default: "Other"},
        stationary:Boolean,
        clear:{type: Boolean, default: false}
      }
    ],
    groupReported: {type: Boolean, default: false},
    group: [
      {
        
        name: String,
        clear:Boolean
      }
    ],
    peopleReported: {type: Boolean, default: false},
    people: [
      {
        
        name: String,
        status:String,
        clear:Boolean
      }
    ],
    targets: {
      objects: [String],
      network: [String],
      people: [String],
      unsorted: String
    },
    casualties: {
      totals: {type: Number, default: 0},
      susMils: {type: Number, default: 0},
      civilians: {type: Number, default: 0},
      unknowns: {type: Number, default: 0},
      hvts: {type: Number, default: 0},
      children: {type: Number, default: 0}
    },
    details: [String],
    
    sources: [
      {
        title: String,
        link: String,
        altLink: String,
        pubDate: Date,
        countStatistics: {type: Boolean, default: false},
        tags: [String],
        mainReport: {
          casualties: {
            totals: {type: Number, default: 0},
            susMils: {type: Number, default: 0},
            civilians: {type: Number, default: 0},
            unknowns: {type: Number, default: 0},
            hvts: {type: Number, default: 0},
            children: {type: Number, default: 0}
          },
          sources: [String],
          target: {
            unsorted: [String],
            targetTypeDetails: String,
            additionalDetails: String,
            location: String,
            targetType: String,
            time: String,
          },
          killed: {
            status: String,
            unsorted: [String],
            additionalDetails: String
          },
          weapons: {
            terms: [String],
            ambiguous: {type: Boolean, default: false}
          },
          
          relevantStrikes: [String]
        },
        conflictingReports: Array,
        
        primary: {
          aggregate: Boolean,
          other: Boolean
        },
        
      }
    ]
})
var EmptyStrike = {
    countries: {
      attackers: [],
      targets: []
    },
    type: {
      weapons: {
        terms: []
      },
      actions: {
        terms: []
      }
    },
    targets: {
      objects: [],
      network: [],
      people: []
    },
    casualties: {},
    details: [],
    sources: [
        {
            mainReport: {
                sources: [],
                weapons: {
                    terms: []
                },
                relevantStrikes: []
            },
            tags: []
        }
    ]
};


var AbridgedName = {
  "strikeId": 1,
  "people": 1,
  "date": 1,
  "countries": 1
  
};
var AbridgedStrike = {
	"sources": 0,
	"details": 0,
	"targets": 0,
	"extended": 0,
  "onBorder": 0,
  "stateStatus": 0,
	"time": 0,
  "type.weapons": 0,
  "type.actions": 0,
	"countries.targets.locale": 0,
  "countries.targets.region": 0,
  "countries.targets.division": 0,
  "countries.targets.subdivision": 0,
  
};
var AbridgedSingleStrike = {
	"sources.mainReport.relevantStrikes": 0,
  "sources.conflictingReports": 0,
  "sources.primary": 0,
	"type.weapons": 0,
  "type.actions": 0,
	"targets": 0
};
StrikeSchema.plugin(AutoIncrement, {inc_field: 'strikeId'});
var Strike = mongoose.model("Strike", StrikeSchema);

module.exports.Strike = Strike;
module.exports.EmptyStrike = EmptyStrike;
module.exports.AbridgedStrike = AbridgedStrike;
module.exports.AbridgedName = AbridgedName;
module.exports.AbridgedSingleStrike = AbridgedSingleStrike;