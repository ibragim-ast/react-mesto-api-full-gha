const {
  PORT = 3000,
  DB_URI = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

module.exports = { PORT, DB_URI };
