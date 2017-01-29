const currentTime = require('../utils/currentTime');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
  query: { type: String, required: true },
  searched_at: { type: Date, default: currentTime }
});

searchSchema.static('showRecent', function findByTime () {
  return this.find({}).sort('-searched_at').limit(10).exec()
    .then(docs => docs.map(entry => ({
      query: entry.query,
      searched_at: entry.searched_at
    })));
});

module.exports = mongoose.model('Search', searchSchema);
