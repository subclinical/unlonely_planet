$(document).ready(function () {
  // load map
  // load markers

  // load list of points
  // function loadPoints() {
  //   console.log("performing ajax call to load points...")
  //   $.ajax({ //make Ajax GET request to *url* and receive the array of points as JSON
  //     url: '/temp',
  //     method: 'GET',
  //     success: renderPoints
  //   })
  // }

  // on mouseover, display marker's infoWindow 

  // on mouseleave, hide marker's infoWindow


  let sampleCoords = [
    {
      lat: 51.507,
      lng: -0.128
    },
    {
      lat: 51.663,
      lng: -0.831
    },
    {
      lat: 55.501,
      lng: -2.333
    }
  ]

  var map;
  bounds = new google.maps.LatLngBounds();

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 51.5074, lng: -0.1278 },
      zoom: 8
    });
  }

  function renderMarkers(array) {
    // console.log(array)
    for (coords of array) {
      createMarker(coords) // create a new marker
      loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng()); // based on the newly created marker, extend the "bounds"
      bounds.extend(loc);
    }
    map.fitBounds(bounds);
  }

  function createMarker(coords) {
    marker = new google.maps.Marker({
      position: coords,
      map: map
    });
  }
  // map.fitBounds(bounds);

  initMap();
  renderMarkers(sampleCoords);



  // var bounds = new.google.maps.LatLngBounds();
  // console.log(bounds);
  // for (let i = 0; i < sampleCoords.length; i++) {
  //   bounds.extend(sampleCoords[i].getPosition());
  // }

  // map.fitBounds(bounds);



  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createPointElement(obj) {
    let point_description = obj.description;
    let point_location = obj.location;

    pointElement = (`
  
  <article class="point_element">
  <!-- <img class="location_pic" src="/images/location.png"> -->
  <span class="point_element_description"> ${escape(point_description)} </span>
  <span class="point_element_location"> ${escape(point_location)} </span>
  </article>
  `);

    return pointElement;
  };


  function renderPoints(array) {

    for (point of array) { // point is an object within an array

      $(".point_element_container").append(createPointElement(point));
    }
  }


  let samplePoints = [
    {
      description: "Palace2",
      location: "London"
    },
    {
      description: "Waterfall",
      location: "Sydney"
    }
  ];

  renderPoints(samplePoints);



})



// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });
