'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence');
var slug = require('mongoose-slug-generator');
// model for peoples
var PeopleSchema = new Schema({
    staffId: {type: Number, unique: true},
	slug: { type: String, slug: "name", slug_padding_size: 4,  unique: true },
    name: String,
    title: String,
    img: String,
    shortBio: String,
    email: String,
    twitter: String,
    github: String,
    website: String,
    bio: String,
    publication: [
        {
        pubName: String,
        link: String
        }
    ]
});
// Save slugs to 'myslug' field. 
mongoose.plugin(slug);
PeopleSchema.plugin(AutoIncrement, {inc_field: 'staffId'});
var People = mongoose.model("People", PeopleSchema);

module.exports.People = People;