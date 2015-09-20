jest.dontMock('../commentMessage.jsx');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

beforeEach(function(){
  $ = {
    ajax:function(){
      this.ajaxProps = arguments[0];
    },
  };
});

describe('commentMessage', function(){
  it('should create a composite component and render properly', function(){
    var CommentMessage = require('../commentMessage.jsx');
    var commentMessage = TestUtils.renderIntoDocument(
         <CommentMessage             
           key={ 5 }
           token={ '' }
           auth={ 5 }
           messageId={ 5 }
           commentId={ 5 }
           commentMessage={ 'hello' }
           commentVotes={ 0 }
           commentTimestamp={ 0 }
           baseId={ 5 }
           hairId={ '' } />
      );
    expect(TestUtils.isCompositeComponent(commentMessage)).toEqual(true);
    expect(commentMessage.props.commentMessage).toEqual('hello');
  });
  
  it('should up vote and down vote', function(){
    var CommentMessage = require('../commentMessage.jsx');
    var commentMessage = TestUtils.renderIntoDocument(
          <CommentMessage             
            key={ '5' }
            token={ '' }
            auth={ '5' }
            messageId={ '5' }
            commentId={ '5' }
            commentMessage={ 'hello' }
            commentVotes={ 0 }
            commentTimestamp={ 0 }
            baseId={ '5' }
            hairId={ '' } />
      );

    var upVote = TestUtils.findRenderedDOMComponentWithClass(commentMessage, 'glyphicon glyphicon-chevron-up');
    var downVote = TestUtils.findRenderedDOMComponentWithClass(commentMessage, 'glyphicon glyphicon-chevron-down');
    
    TestUtils.Simulate.click(upVote);
    expect(JSON.parse($.ajaxProps.data).vote).toEqual(true);
    TestUtils.Simulate.click(downVote);
    expect(JSON.parse($.ajaxProps.data).vote).toEqual(false);

  });

});