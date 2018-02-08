$(document).ready(function () {
 $.ajax({
   url: '/maps',
   method: 'GET',
   success: renderMapElements
 })

  // on mouseover, display marker's infoWindow 
  // on mouseleave, hide marker's infoWindow

  

  //on document.load, create and render map elements (home page), there should be no markers
  //header should show "Explore your world", back button should be hidden

  var map;
  bounds = new google.maps.LatLngBounds();

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 51.5074, lng: -0.1278 },
      zoom: 8
    });
  }

  initMap();


  function createMapElement(obj) {
    let mapId = obj.id;
    let mapTitle = obj.title;
    let mapCity = obj.city;

    mapElement = (`
    <article class="map_element" data-mapID="${escape(mapId)}">
      <span class="map_element_title"> ${escape(mapTitle)} </span>
      <span class="map_element_city"> ${escape(mapCity)} </span>
    </article>
    `)
    return mapElement;
  }

  function renderMapElements(array) {
    let mapHeader = (`
    <h1 class="sidebar_title">Explore Your World</h1>
    `)
    $(".sidebar_header").append(mapHeader);
    for (map of array) { // point is an object within an array
      $(".element_container").append(createMapElement(map));
    }
  }






  //create and render location elements (specific map page) and markers

  $(document).on('click', ".map_element", function () {
    $('.element_container').empty(); // if needed
    $('.sidebar_back').css("display", "block")
    let mapID = $(this).data("mapID")
    $.ajax({
      method: "GET",
      url: "/maps/search/" + mapID,// locations/points page
      success: function () {
        renderLocationElements();
        renderMarkers();
      }
    })
  })


  function createMarker(coords) {
    marker = new google.maps.Marker({
      position: coords,
      map: map
    });
  }

  function renderMarkers(obj) {
    for (coords of obj.markers) {
      createMarker(coords) // create a new marker
      loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng()); // based on the newly created marker, extend the "bounds"
      bounds.extend(loc);
    }
    map.fitBounds(bounds);
  }



  function createLocationElement(marker) {
    let point_Id = marker.id;
    let point_label = marker.label;
    let point_description = marker.description;


    pointElement = (`
      <article class="point_element" data-pointID="${escape(point_Id)}">
      <img class="location_pic" src="/images/location.png">
      <span class="point_element_description"> ${escape(point_label)} </span>
      </article>
    `);
    return pointElement;
  };


  function renderLocationElements(obj) {
    let mapTitle = obj.title;
    let mapHeader = (`
      <h1 class="sidebar_title">${escape(mapTitle)}</h1>
    `)
    $(".sidebar_header").append(mapHeader);
    
    for (point of obj.markers) { // point is an object within an array
      $(".element_container").append(createLocationElement(point));
    }
  }




  //create and render location details (specific location page)

  $(document).on('click', ".location_element", function () {
    $('.element_container').empty(); // if needed
    $('.sidebar_back').css("display", "block")
    let locationID = $(this).data("locationID")
    $.ajax({
      method: "GET",
      url: "/maps/search/" + locationID, //  location details page
      success: renderLocationDetails
    })
  })





  function renderLocationDetails(obj) {
    let locationDescription = obj.markers.description;
    let point_label = obj.markers.label;

    let locationHeader = (`
      <h1 class="sidebar_title">${escape(point_label)}</h1>
    `)

    locationContent = (`
    <p>${escape(locationDescription)}</p>
  `);


    $(".sidebar_header").append(locationHeader);
    $(".panel_content").append(locationContent);
  };
})




function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

