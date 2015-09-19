var React = require('react');

var message = "<p>Hi this is a message popUp</p>"

module.exports = React.createClass({
    showMap: function(position){
        localStorage.setItem('Latitude', position.coords.latitude);
        localStorage.setItem('longitude', position.coords.longitude);
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'; 

        var mapOptions = {
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 12
            },
            map = new google.maps.Map(this.getDOMNode(), mapOptions);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
            map: map, 
            title: "Where you're at", 
            icon: new google.maps.MarkerImage(iconBase + 'man.png', null, null, null, new google.maps.Size(40, 40)) 
        });

        var infowindow = new google.maps.InfoWindow({
            content: message
        });

        marker.addListener('click', function(){
            map.setZoom(18);
            map.setCenter(marker.getPosition());
        });
        marker.addListener('mouseover', function(){
            infowindow.open(map, marker);
        });
        marker.addListener('mouseout', function(){
            infowindow.close(map, marker);
        });

        var newMarker = new google.maps.Marker({
            position: new google.maps.LatLng(37.77493, -122.41942), 
            map: map, 
            icon: new google.maps.MarkerImage("http://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/512/chat-icon.png", null, null, null, new google.maps.Size(40, 40))
        });
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
