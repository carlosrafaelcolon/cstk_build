'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// model for Publication
var slug = require('mongoose-slug-generator');
var BlogSchema = new Schema({
    slug: { type: String, slug: "title", slug_padding_size: 4,  unique: true },
    title: String,
    subtitle: String,
    category:String,
    tags: [String],
    date: Date,
    updated: { type: Date, default: Date.now },
    authors: [
        {
            name:String,
            authorId:Number,
        }
    ],
    body: String
})

// Save slugs to 'myslug' field. 
mongoose.plugin(slug);
var Blog = mongoose.model("Blog", BlogSchema);

module.exports.Blog = Blog;