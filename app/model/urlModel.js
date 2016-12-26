'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = Schema({
    _id: {type: String, required: true},
    count: { type: Number, default: 0 }
});

const counter = mongoose.model('counter', CounterSchema);
// create a schema for our links
const urlSchema = new Schema({
  _id: {type: Number, index: true},
  url: String
});

urlSchema.pre('save', function (next) {
  const doc = this;
  counter.findByIdAndUpdate(
    {_id: 'url_count'},
    {$inc: {count: 1} },
    {new: true},
    (error, counter) => {
      if (error) return next(error);
      doc._id = counter.count;
      next();
  });
});

mongoose.model('Url', urlSchema);
