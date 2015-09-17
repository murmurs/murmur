var jest = require('jest');

jest.dontMock('./inputbox.js');

beforeEach(function(){
  if($){
  	console.log($);
  }
});

describe('inputbox', function(){
  it('should send message when enter pressed', function(){
  	var React = require('react/addons');
  	var InputBox = require('../inputbox.jsx');
  	var TestUtils = React.addons.TestUtils;

  	var inputbox = TestUtils.renderIntoDocument(
          <InputBox />
  		);

  	var div = React.findRenderedDOMComponentWithClass(
  		inputbox, 'input-group'));

    console.log(div);
    
  });
});