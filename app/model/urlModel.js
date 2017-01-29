const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./counterModel');

const urlSchema = new Schema({
  _id: { type: Number, index: true },
  url: { type: String, required: true }
});

urlSchema.pre('save', function (next) {
  const doc = this;
  Counter.findByIdAndUpdate(
    { _id: 'url_count' },
    { $inc: { count: 1 } },
    { new: true },
    (err, counter) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      doc._id = counter.count;
      next();
    });
});

module.exports = mongoose.model('Url', urlSchema);
