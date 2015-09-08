var React = require('react');
var ViewAllMessage = require('./viewAllMessage');


var messagesObject = {
  '-JyPWEeY7YxnWBloaGDz': {
    'Comments': {},
    'message': "Message text",
    'messageId': "-JyPWEeY7YxnWBloaGDz",
    'timestamp': 1441406450396,
    'votes': 10,
  },
  '-JyfmRk_mOoElFz0XQ2w': {
    'Comments': {},
    'message': "2nd Message text",
    'messageId': "-JyfmRk_mOoElFz0XQ2w",
    'timestamp': 1441406450337,
    'votes': 10,
  },
}

var element = React.createElement(ViewAllMessage, messagesObject);
React.render(element, document.querySelector('.container'));
