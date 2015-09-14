var React = require('react');
var StyleSheet = require('react-style')

module.exports = React.createClass({
  render: function() {

    var baseUrl = 'url(./src/img/face/base/buy-face-' + this.props.baseId +'.png)';
    this.styles.basePng.backgroundImage = baseUrl;
    var hairUrl = 'url(./src/img/face/hair/hair-' + this.props.hairId +'.png)';
    this.styles.hairPng.backgroundImage = hairUrl;
    return(
            <span className="face-wrap">
              <span className="face">
                <span className="face-base"
                  style={ this.styles.basePng }>
                </span>
                <span className="face-hair"
                  style={ this.styles.hairPng }>
                </span>
              </span>
            </span>
    )

    var reactFace = React.createElement(face); // optional if you want to use the jquery wrapped version
    console.log(reactFace);
    return(reactFace);
  },
  // styles temporarily in index.html
  styles: {
    basePng: {
      backgroundImage: {
      },
    },
    hairPng: {
      backgroundImage:{
      },
    }
  },
});
