const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
  query: { type: String, required: true },
  searched_at: Date
});

searchSchema.pre('save', function (next) {
  this.searched_at = new Date();
  next();
});

mongoose.model('Search', searchSchema);
