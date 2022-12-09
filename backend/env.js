const { SECRET_KEY = 'some-secret-key' } = process.env;
const { MONGO_DB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  SECRET_KEY,
  MONGO_DB,
};
