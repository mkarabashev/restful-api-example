'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = Schema({
  _id: {type: String, required: true},
  count: { type: Number, default: 0 }
});

const counter = mongoose.model('counter', CounterSchema);

// create a counter if there isn't one
counter.find({_id: 'url_count'}, function (err, doc) {
  if (err) console.error(err);
  else if (!doc.length) {
    counter({
      _id: 'url_count',
      count: 1000
    }).save();
  }
});

// create a schema for our links
const urlSchema = new Schema({
  _id: {type: Number, index: true},
  url: String
});

urlSchema.pre('save', function (next) {
  const doc = this;
  counter.findByIdAndUpdate(
    {_id: 'url_count'},
    {$inc: { count: 1 }},
    {new: true},
    (err, counter) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      doc._id = counter.count;
      next();
    });
});

mongoose.model('Url', urlSchema);
