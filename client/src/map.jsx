  var React = require('react');

module.exports = React.createClass({
    // getDefaultProps: function () {

    //     return {
    //         initialZoom: 6,
    //         mapCenterLat: 53.5333,
    //         mapCenterLng: -113.4073126
    //     };
    // },
    // componentDidMount: function (rootNode) {
    //     var mapOptions = {
    //             center: new google.maps.LatLng(this.props.mapCenterLat, this.props.mapCenterLng),
    //             zoom: this.props.initialZoom
    //         },
    //         map = new google.maps.Map(this.getDOMNode(), mapOptions);
    //     var marker = new google.maps.Marker({position: new google.maps.LatLng(this.props.mapCenterLat, this.props.mapCenterLng), title: 'Hi', map: map});
    //     this.setState({map: map});
    // },
    showMap: function(position){
        var mapOptions = {
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 6
            },
            map = new google.maps.Map(this.getDOMNode(), mapOptions);
        new google.maps.Marker({position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), map: map, draggable: true});
        new google.maps.Marker({position: new google.maps.LatLng(43.707594, -75.410156), title: 'Hi', map: map, icon: {path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, scale: 4}});
        this.setState({map: map});
    },
    getLocation: function(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.showMap);
        }
        else{
            alert("Geolocation is not supported by this browser.");
        }
    },
    render: function () {

        this.getLocation();

        return (
          <div className='map-gic'></div>
        );
    }
});

// function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude + 
//     "<br>Longitude: " + position.coords.longitude;  
// }