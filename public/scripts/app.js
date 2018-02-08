


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

// var loadMaps = function () {

// $.ajax({
//   url: '/maps/:id',
//   method: 'GET',
//   success: function (response) {
//     console.log('Success: ', response);
//     $('#maps-container').empty();
//     renderMap(response);
//     }
//   })

// }

var renderMap = function (response) {
  function initMap() {
  var options = {
  zoom: 10,
  center: {lat: mapinfo.lat, lng: mapinfo.lng }
  }

  var map = new google.maps.Map(document.getElementById('map'), options);

  var markers = for (var i of mapinfo);//some array
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
  bounds.extend(markers[i].getPosition());
  }

map.fitBounds(bounds);


  var bounds  = new google.maps.LatLngBounds();
  loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
  bounds.extend(loc);
  map.fitBounds(bounds);       //# auto-zoom
  map.panToBounds(bounds);     // # auto-center

  }
}

renderMap(mapinfo);

// });



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



var mapinfo = [{
  id: 1,
  title: Fresh on Spadina,
  lat: 43.648239,
  lng: -79.395851
  zoom:
  date_created:
  creator_id:
},
{ id: 2,
  title: Ikea,
  lat: 43.618487,
  lng: -79.534538
  zoom:
  date_created:
  creator_id:
},
{ id: 4,
  title: Ikea,
  lat: 50.120578,
  lng: -122.957455
  zoom:
  date_created:
  creator_id:
}];

