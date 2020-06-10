const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    id: {type: String, unique: true, required: true, max: 100},
    title: {type: String, required: true, max: 100},
    description: {type: String, required: true},
    img: {type: String, required: true},
    author: {type: String, required: true},
    time: {type: Date, required: true},
});

module.exports = mongoose.model('Post', PostSchema);