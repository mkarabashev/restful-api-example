'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./counterModel');
const encode = require('../services/urlShortener/base58').encode;

const SITE_URL = process.env.URL || 'localhost:5000';

const UrlSchema = new Schema({
  _id: { type: Number, index: true },
  url: { type: String, required: true }
});

UrlSchema.pre('save', function (next) {
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

UrlSchema.virtual('encodedUrl').get(function encoded () {
  return `${SITE_URL}/${encode(this._id)}`;
});

module.exports = mongoose.model('Url', UrlSchema);
