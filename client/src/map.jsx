var React = require('react');

var message = "<p>Hi this is a message popUp</p>"

module.exports = React.createClass({
    showMap: function(position){
        var mapOptions = {
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 4
            },
            map = new google.maps.Map(this.getDOMNode(), mapOptions);

        var marker = new google.maps.Marker({position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), map: map, title: "Where you're at"});
        var infowindow = new google.maps.InfoWindow({
            content: message
        });

        marker.addListener('click', function(){
            infowindow.open(map, marker);
        });
        
        var newMarker = new google.maps.Marker({position: new google.maps.LatLng(43.707594, -75.410156), title: 'Hi', map: map, icon: {path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, scale: 4}});
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

// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: {lat: -25.363882, lng: 131.044922 }
//   });

//   map.addListener('click', function(e) {
//     placeMarkerAndPanTo(e.latLng, map);
//   });
// }

// function placeMarkerAndPanTo(latLng, map) {
//   var marker = new google.maps.Marker({
//     position: latLng,
//     map: map
//   });
//   map.panTo(latLng);
// }
