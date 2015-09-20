jest.dontMock('../inputbox.jsx');
var Inputbox = require('../inputbox.jsx');
var React = require('react/addons');

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
          <Inputbox />
  		);
    expect(TestUtils.isCompositeComponent(inputbox)).toEqual(true);
  });
  
  it('should make ajax post on enter keystroke', function(){

    var inputbox = TestUtils.renderIntoDocument(
      <Inputbox />
      );
    var input = TestUtils.findRenderedDOMComponentWithClass(inputbox, 'form-control');
    var form = TestUtils.findRenderedDOMComponentWithClass(inputbox, 'clearfix');

    expect(input.getDOMNode()).toBeTruthy();
    expect(input.getDOMNode()).toBeTruthy();

    TestUtils.Simulate.change(input, {target : {value: 'abc123'}});
    TestUtils.Simulate.submit(form);
    expect(JSON.parse($.ajaxProps.data).message).toEqual('abc123');
  });

});




