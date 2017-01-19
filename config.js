exports.DB = process.env.MONGODB_URI || 'mongodb://127.0.0.1/test';
exports.PORT = process.env.PORT || 5000;
exports.URL = process.env.URL || `localhost:${exports.PORT}`;
