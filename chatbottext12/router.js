const api = require('./api.js');

module.exports = function(app){
  app.use('/chatbot/api', api);
};