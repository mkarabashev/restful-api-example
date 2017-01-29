const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// counter is there to deal with concurrency via findByIdAndUpdate
const CounterSchema = Schema({
  _id: { type: String, required: true },
  count: { type: Number, required: true }
});

const Counter = mongoose.model('Counter', CounterSchema);

// create a counter if there isn't one
Counter.find({_id: 'url_count'}, function (err, doc) {
  if (err) console.error(err);
  else if (!doc.length) {
    Counter({
      _id: 'url_count',
      count: 1000
    }).save();
  }
});

module.exports = Counter;
