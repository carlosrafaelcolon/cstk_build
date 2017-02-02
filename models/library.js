'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence');

// model for Publication

var PublicationSchema = new Schema({
    pubId: {type: Number, unique: true},
    title: String,
    themes: [String],
    topics: [String],
    pubDate: Date,
    authors: [String],
    pubType: String,
    publisher: String,
    pageCount : Number,
    summary: String,
    link: String,
    reviewed: {type: Boolean, default: false},
    reviews:  [
          {
            reviewer: String,
            reviewTitle: String,
            reviewLink: String
          }
      ]
})

PublicationSchema.plugin(AutoIncrement, {inc_field: 'pubId'});
var Publication = mongoose.model("Publication", PublicationSchema);

module.exports.Publication = Publication;