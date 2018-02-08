


$(document).ready(function() {
    console.log("ready to go MAPS!");
});

$(document).on('ready', function () {

// blank page
// 5 buttons - toronto NYC tokyo paris LA
// either:
// -
// - clicks - toronto - document.on('click')....AJAX to get the lat long etc
// on respond - take feed INIT

// marker.getLatLng(); returns the latitude and longitude of the marker,
// while map.panTo(GLatLng) allows us to center the map on that latitude and longitude.

var loadMaps = function () {

$.ajax({
  url: '/maps/:id',
  method: 'GET',
  success: function (response) {
    console.log('Success: ', response);
    $('#maps-container').empty();
    renderMap(response);
    }
  })

}

var renderMap = function (response) {
  function initMap() {
  var options = {
  zoom: response.zoom,
  center: {lat: response.lat, lng: response.lng }
  }

  var map = new google.maps.Map(document.getElementById('map'), options);

  var bounds  = new google.maps.LatLngBounds();
  loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
  bounds.extend(loc);
  map.fitBounds(bounds);       //# auto-zoom
  map.panToBounds(bounds);     // # auto-center

  }
}



});



// var markers = [];//some array
// var bounds = new google.maps.LatLngBounds();
// for (var i = 0; i < markers.length; i++) {
//  bounds.extend(markers[i].getPosition());
// }


// CLIENT
// get USER IP address and get geolocate of location of IP

// CASE A
// show a map of a location in  the DB

      // new map



mapinfo = {
  id: 1,
  title: New York,
  lat:
  lng:
  zoom:
  date_created:
  creator_id:
}
