'use strict';

const currentTime = require('../utils/currentTime');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchSchema = new Schema({
  query: { type: String, required: true },
  searched_at: { type: Date, default: currentTime }
});

SearchSchema.static('showRecent', function findByTime () {
  return this.find({}).sort('-searched_at').limit(10).exec()
    .then(docs => docs.map(entry => ({
      query: entry.query,
      searched_at: entry.searched_at
    }))).catch(err => err);
});

module.exports = mongoose.model('Search', SearchSchema);
