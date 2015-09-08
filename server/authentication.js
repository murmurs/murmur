//DATABASE AUTHENTICATION
//used in saving our sessionId into our database
//authentication our users...
var Firebase = require('firebase');
module.exports = {
  host: 'fiery-heat-3376.firebaseio.com/', //our database location
  token: 't2kSNyDUP3YhTCXWwroaTnworNSulqfCCTTU4T8x', //firebase secret key
  reapInterval: 1000 * 1000 * 60 * 60 * 24 * 30 //sessionId will be stored for 30 days
};



