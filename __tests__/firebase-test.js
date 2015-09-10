jest.dontMock('../server/firebase');
jest.dontMock('mockfirebase');

var firebase;
var MockFirebase;
var fbRef;
var dataRef;
beforeEach(function(){
  firebase = require('../server/firebase.js');
  MockFirebase = require('mockfirebase').MockFirebase;
  MockFirebase.DEFAULT_DATA = {
    // 'Fresh Post': {
        seedMessageId: {
          messageId: 'messageIdValue',
          message: 'messageValue',
          timestamp: 'timestampValue',
          votes: 0,
          comments: {
            commentId: 'commentIdValue',
            comment: 'commentValue',
            timepstamp: 'timestampValue',
            votes: 9,
        }
      }
    // }
  }
  fbRef = new MockFirebase('ANY_URLISH_STRING');
  fbRef.key = function() { return 'keyId'};
  dataRef = {
    push: function () {
      return fbRef;
    },
    child: function() {
      return fbRef;
    }
  }
})

describe('insertPost', function(){

  it('is a function', function(){
    expect(typeof firebase.insertPost).toBe('function');
  })

  it('takes an { message } and a reference input', function(){
    expect(function(){
      firebase.insertPost({
        message: 'Correct Input'
      }, dataRef)
    }).not.toThrow();
  })

  xit('will not take an empty object', function(){
    expect(function(){
      firebase.insertPost({ }, dataRef)
    }).toThrow();
  })

  it('gives the right output', function(){
    firebase.insertPost({
      message: 'Having the right Output Message rocks'
    }, dataRef)

    expect(fbRef.set.mock.calls[0][0].messageId)
      .toBe('keyId');
    expect(fbRef.set.mock.calls[0][0].message)
      .toBe('Having the right Output Message rocks');
    expect(fbRef.set.mock.calls[0][0].timestamp)
      .toEqual({ '.sv': 'timestamp' });
    expect(fbRef.set.mock.calls[0][0].votes)
      .toEqual(0);
    expect(fbRef.set.mock.calls[0][0].comments)
      .toBe('no comments');
  })
})

describe('votePost', function(){

  it('is a function', function(){
    expect(typeof firebase.votePost).toBe('function');
  })

  it('takes an { messageId, vote } and a reference input', function(){
    expect(function(){
      firebase.votePost({
        messageId: 'Correct Input',
        vote: 0,
      }, dataRef)
    }).not.toThrow();
  })

  xit('will not take an empty object', function(){
    expect(function(){
      firebase.votePost({ }, dataRef)
    }).toThrow();
  })

  it('gives the right output', function(){
    firebase.votePost({
      messageId: '',
      vote: true,
    }, dataRef)
    // transaction callback increments the closure var vote again
    expect(fbRef.transaction.mock.calls[0][0](true))
      .toBe(2);
  })
})

describe('comment', function(){
  var dataRef;
  beforeEach(function(){
    var refPush = {
      push: function(){
        return fbRef;
      }
    }
    dataRef = {
      child: function() {
        return refPush;
      }
    }
  })

  it('is a function', function(){
    expect(typeof firebase.comment).toBe('function');
  })

  it('takes an { message } and a reference input', function(){
    expect(function(){
      firebase.comment({
        messageId: 'messageIdValue',
        comment: 'commentValue'
      }, dataRef)
    }).not.toThrow();
  })

  xit('will not take an empty object', function(){
    expect(function(){
      firebase.comment({ }, dataRef)
    }).toThrow();
  })

  it('gives the right output', function(){
    firebase.comment({
      messageId: 'OriginalPoster1',
      comment: 'Having the right comment rocks'
    }, dataRef)

    expect(fbRef.set.mock.calls[0][0].commentId)
      .toBe('keyId');
    expect(fbRef.set.mock.calls[0][0].comment)
      .toBe('Having the right comment rocks');
    expect(fbRef.set.mock.calls[0][0].timestamp)
      .toEqual({ '.sv': 'timestamp' });
    expect(fbRef.set.mock.calls[0][0].votes)
      .toEqual(0);
  })
})

describe('voteComment', function(){

  it('is a function', function(){
    expect(typeof firebase.voteComment).toBe('function');
  })

  it('takes an { comment, vote } and a reference input', function(){
    expect(function(){
      firebase.voteComment({
        messageId: 'messageIdValue',
        commentId: 'commentIdValue',
        vote: 0,
      }, dataRef)
    }).not.toThrow();
  })

  xit('will not take an empty object', function(){
    expect(function(){
      firebase.voteComment({ }, dataRef)
    }).toThrow();
  })

  it('gives the right output', function(){
    firebase.voteComment({
      messageId: '1',
      commentId: '1',
      vote: true,
    }, dataRef)
    // transaction callback increments the closure var vote again
    expect(fbRef.transaction.mock.calls[0][0](true))
      .toBe(2);

    expect(fbRef.transaction.mock.calls[0][0](false))
      .toBe(1);

  })
})

