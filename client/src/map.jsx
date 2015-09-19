var React = require('react');

var message = "<p>Hi this is a message popUp</p>"
var arr = [{messages: 'Hi', lat: 37.77493, lng: -122.41942}, {messages: 'Hello', lat: 37.423021, lng: -122.083739}];

module.exports = React.createClass({
    showMap: function(position){
        localStorage.setItem('Latitude', position.coords.latitude);
        localStorage.setItem('longitude', position.coords.longitude);
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'; 

        var mapOptions = {
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 5
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

        function addInfoWindow(marker, message) {
            var infoWindow = new google.maps.InfoWindow({
                content: message
            });
            marker.addListener('mouseover', function () {
                infoWindow.open(map, marker);
            });
            marker.addListener('mouseout', function () {
                infoWindow.close(map, marker);
            });
        }

        for(var i = 0; i < arr.length; i++){
            arr[i].marker = new google.maps.Marker({       
                position: new google.maps.LatLng(arr[i].lat, arr[i].lng), 
                map: map,
                icon: new google.maps.MarkerImage("http://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/512/chat-icon.png", null, null, null, new google.maps.Size(40, 40))     
            }); 
            addInfoWindow(arr[i].marker, arr[i].messages)
        }
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
