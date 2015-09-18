jest.dontMock('../client/src/inputbox.jsx');
jest.dontMock('../__tests__/parent.jsx');
var React = require('react/addons');

var TestUtils = React.addons.TestUtils;
var Parent = require('../__tests__/parent.jsx');

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
          <Parent />
  		);
   //  expect(TestUtils.isCompositeComponent(inputbox)).toBeTruthy();
  });
  
  it('should make ajax post on enter keystroke', function(){

    // var inputbox = TestUtils.renderIntoDocument(
    //   <InputBox />
    //   );
    // var input = TestUtils.findRenderedDOMComponentWithClass(inputbox, 'form-control');
    // var form = TestUtils.findRenderedDOMComponentWithClass(inputbox, 'clearfix');

    // expect(input.getDOMNode()).toBeTruthy();
    // expect(input.getDOMNode()).toBeTruthy();

    // TestUtils.Simulate.change(input, {target : {value: 'abc123'}});
    // TestUtils.Simulate.submit(form);
    // console.log($.ajaxProps);
    // expect(JSON.parse($.ajaxProps.data).message).toEqual('abc123');
  });

});




