exports.DB = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/test';
exports.PORT = process.env.PORT || 5000;
exports.URL = process.env.URL || `localhost:${exports.PORT}`;
