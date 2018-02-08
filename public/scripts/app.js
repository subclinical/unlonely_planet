
// blank page
// 5 buttons - toronto NYC tokyo paris LA
// either:
// -
// - clicks - toronto - document.on('click')....AJAX to get the lat long etc
// on respond - take feed INIT

// marker.getLatLng(); returns the latitude and longitude of the marker,
// while map.panTo(GLatLng) allows us to center the map on that latitude and longitude.

// var loadMaps = function () {

$.ajax({
  url: '/maps/:id',     123456
  method: 'GET',
  success: function (response) {
    console.log('Success: ', response);
    $('#maps-container').empty();
    renderMap(response);
    }
  })

// }

// var renderMap = function () { // can we get mapOptions from the response
  // function initMap() {
  // var mapOptions = {
  // zoom: 10,
  // center: {lat: mapinfo.lat, lng: mapinfo.lng }
  // }

  var markers = [{
  lat: 43.648239,
  lng: -79.395851,
  },
{
  lat: 43.618487,
  lng: -79.534538,
},
{
  lat: 50.120578,
  lng: -122.957455,
}];

  mylatLng = { lat: markers[0].lat, lng: markers[0].lng }

  function initMap(maps) {

  var mapOptions = {
    center: mylatLng // this is from mapID
  }

  var bounds = new google.maps.LatLngBounds();

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  for (i = 0; i < markers.length; i++) {
    var position = new google.maps.LatLng(maps.markers[i].lat, maps.markers[i].lng);
    bounds.extend(position);
      var marker = new google.maps.Marker({
      position: position,
      map: map,
    });
  }

  map.fitBounds(bounds);       //# auto-zoom
  map.panToBounds(bounds);     // # auto-center

}





// CLIENT
// get USER IP address and get geolocate of location of IP

// CASE A
// show a map of a location in  the DB

      // new map







