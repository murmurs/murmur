/** @jsx React.DOM */

jest.dontMock('../client/src/inputbox.jsx');

var React = require('react/addons');
var InputBox = require('../client/src/inputbox.jsx');
var TestUtils = React.addons.TestUtils;

beforeEach(function(){
  $ = {
    ajax:function(){
      this.ajaxProps = arguments[0];
    },
  };
});

describe('inputbox', function(){
  it('should create a composite component and render properly', function(){

  	var inputbox = TestUtils.renderIntoDocument(
          <InputBox />
  		);
    expect(TestUtils.isCompositeComponent(inputbox)).toBeTruthy();
   
  });
  
  it('should make ajax post on enter keystroke', function(){

    var inputbox = TestUtils.renderIntoDocument(
      <InputBox />
      );

    var input = TestUtils.findRenderedDOMComponentWithClass(inputbox, 'form-control');

    expect(input.getDOMNode()).toBeTruthy();

    TestUtils.Simulate.change(input, {target : {value: 'abc123'}});

    TestUtils.Simulate.keyDown(input, {keyCode: 13});

    expect(JSON.parse($.ajaxProps.data).message).toEqual('abc123');

  });

  it('should not allow messages greater than 150 characters', function(){
    
  });

});




