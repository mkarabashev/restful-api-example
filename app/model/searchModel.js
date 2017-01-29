const currentTime = require('../utils/currentTime');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
  query: { type: String, required: true },
  searched_at: { type: Date, default: currentTime }
});

module.exports = mongoose.model('Search', searchSchema);
