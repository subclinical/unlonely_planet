
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
//   url: '/maps/:id',     123456
//   method: 'GET',
//   success: function (response) {
//     console.log('Success: ', response);
//     $('#maps-container').empty();
//     renderMap(response);
//     }
//   })

// }

// var renderMap = function () { // can we get mapOptions from the response
  // function initMap() {
  // var mapOptions = {
  // zoom: 10,
  // center: {lat: mapinfo.lat, lng: mapinfo.lng }
  // }

  var maps = { markers: [{
  lat: 43.648239,
  lng: -79.395851,
  description: "this is a test description"
  },
{
  lat: 46.618487,
  lng: -79.534538,
},
{
  lat: 50.120578,
  lng: -122.957455,
}] };

  mylatLng = { lat: maps.markers[0].lat, lng: maps.markers[0].lng }

  function initMap() {

  var mapOptions = {
    center: mylatLng // this is from mapID
  }

  var bounds = new google.maps.LatLngBounds();

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  for (i = 0; i < maps.markers.length; i++) {
    var position = new google.maps.LatLng(maps.markers[i].lat, maps.markers[i].lng);
    bounds.extend(position);
      var marker = new google.maps.Marker({
      position: position,
      map: map,
    });
      var infoWindow = new google.maps.InfoWindow({ content: maps.markers.description });
        // google.maps.event.addListener(marker, 'click', function(event){
  marker.addListener('click', function () {
  infoWindow.open(map, marker);
  console.log("clicked!")
  });


  }

  map.fitBounds(bounds);       //# auto-zoom
  map.panToBounds(bounds);     // # auto-center

  // listen for a click and run function addMarker on a click:
  // google.maps.event.addListener(map, 'click',
  //   function(event){
  //   console.log("clicked")
  //   addMarker({coords: event.latLng});
  //   console.log(event.latLng)
  // });

  function addMarker(props) {
    var marker = new google.maps.Marker({
    position: props.coords,
    map:map,
    });
  }




}





// CLIENT
// get USER IP address and get geolocate of location of IP

// CASE A
// show a map of a location in  the DB

      // new map







