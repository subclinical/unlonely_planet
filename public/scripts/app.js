$(document).ready(function () {
  $.ajax({
    url: '/maps',
    method: 'GET',
    success: function (maps) {
      initialRender();
      renderMapElements(maps);
    }
  })

  // on mouseover, display marker's infoWindow 
  // on mouseleave, hide marker's infoWindow



  //on document.load, create and render map elements (home page), there should be no markers
  //header should show "Explore your world", back button should be hidden

  // var map;
  // bounds = new google.maps.LatLngBounds();

  function initialRender() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 51.5074, lng: -0.1278 },
      zoom: 8
    });
  }

  // initMap();


  function initMap(maps) {
    mylatLng = { lat: maps.markers[0].lat, lng: maps.markers[0].lng }

    var mapOptions = {
      center: mylatLng // this is from mapID
    }

    var bounds = new google.maps.LatLngBounds();

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    for (var i = 0; i < maps.markers.length; i++) {

      // (function (i) {

      var position = new google.maps.LatLng(maps.markers[i].lat, maps.markers[i].lng);
      bounds.extend(position);

      var marker = new google.maps.Marker({
        position: position,
        map: map,
      });

      // marker.addListener('click', function () {
      // console.log(position.lat)
      var infoWindow = new google.maps.InfoWindow({ content: maps.markers[i].description, position: position });
      infoWindow.open(map, marker);
      // console.log("clicked!")
      // });

      // })(i)

    }
    map.fitBounds(bounds);       //# auto-zoom
    map.panToBounds(bounds);     // # auto-center

    // listen for a click and run function addMarker on a click:
    google.maps.event.addListener(map, 'click',
      function (event) {
        console.log("clicked")
        addMarker({ coords: event.latLng });
        console.log(event.latLng)
      });

    function addMarker(props) {
      var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
      });
      var infoWindow = new google.maps.InfoWindow({ content: "blah", position: props.coords });
      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      })

    }

  }

  function createMapElement(obj) {
    let mapId = obj.id;
    let mapTitle = obj.title;
    let mapCity = obj.city;

    let mapElement = (`
    <article class="map_element" data-mapid="${mapId}">
      <span class="map_element_title"> ${mapTitle} </span>
      <span class="map_element_city"> ${mapCity} </span>
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

  $('.element_container').on('click', ".map_element", function (event) {
    $('.element_container').empty(); // if needed
    $('.sidebar_back').css("display", "block")
    console.log(event.target);
    let mapID = $(event.target).closest('article').data("mapid");
    console.log(mapID);
    $.ajax({
      method: "GET",
      url: "/maps/search/" + mapID,// locations/points page
      success: function (map) {
        console.log(map);
        initMap(map);
      }
    })
  })



  function createLocationElement(marker) {
    let point_Id = marker.id;
    let point_label = marker.label;
    let point_description = marker.description;


    pointElement = (`
      <article class="point_element" data-pointID="${escape(point_Id)}">
      <img class="location_pic" src="">
      <span class="point_element_description"> ${escape(point_label)} </span>
      </article>
    `);
    return pointElement;
  };


  function renderLocationElements(obj) {
    console.log(obj);
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




  //add new map
  $(".create_map").on('click', function () {
    $('.element_container').empty();

    let map_form = (`
      <form>
      <textarea name="map_name" placeholder="Map Name"></textarea>
      <textarea name="map_location" placeholder="Map Location"></textarea>
      <input class="save_map" type="submit" value="Save">
      <input class="cancel_map" type="submit" value="Cancel">
      </form>
      `)

$(".element_container").append(map_form);

  })

  // create new map link, on click,
  //   clear container
  // append html form
  // save button, cancel button


  //save button


  //cancel button  //clear container, show list of maps page
  $(".cancel_map").on('click', function (event) {
    event.preventDefault();
    $('.element_container').empty(); // if needed
    $.ajax({
      method: "GET",
      url: "/maps", // maps page
      success: function (map) {
        initMap(map); //display world view with list of available maps
      }
    })
  })




  //when add marker (only when on create map page), display sidebar form
  $("#map").on('click', function () {
    $('.element_container').empty(); // if needed
  })


})




function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

