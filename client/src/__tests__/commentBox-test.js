jest.dontMock('../inputbox.jsx');
var CommnetBox = require('../commentBox.jsx');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

beforeEach(function(){
  $ = {
    ajax:function(){
      this.ajaxProps = arguments[0];
    },
  };
});

describe('commentBox', function(){
  it('should create a composite component and render properly', function(){

    var inputbox = TestUtils.renderIntoDocument(
          <CommnetBox />
      );
    expect(TestUtils.isCompositeComponent(inputbox)).toEqual(true);
  });
  
  it('should make ajax comment on submit click', function(){

    var commentBox = TestUtils.renderIntoDocument(
      <CommnetBox />
      );

    var input = TestUtils.findRenderedDOMComponentWithClass(commentBox, 'form-control');
    var btn = TestUtils.findRenderedDOMComponentWithClass(commentBox, 'btn btn-success');
    
    expect(TestUtils.isDOMComponent(input)).toEqual(true);
    TestUtils.Simulate.change(input, {target : {value: 'abc123'}});
    expect(input.getDOMNode().value).toEqual('abc123');
    TestUtils.Simulate.click(btn);
    expect(JSON.parse($.ajaxProps.data).comment).toEqual('abc123');
  });

});