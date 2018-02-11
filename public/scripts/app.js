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



  // on mouseover, display marker's infoWindow 
  // on mouseleave, hide marker's infoWindow
$('.reg').on('click', function(event) {
  $.ajax({
    url: '/maps/marker/delete/4',
    method: 'DELETE',
    // data: {
    //   label: 'banjo',
    //   city: 'metropolis',
    //   map_id: 4,
    //   lat: 123,
    //   lng: 90,
    //   description: 'work please'
    // },
    success: function() {
      console.log('User registered.');
    }
  })
});


  $('.login').on('click', function (event) {
    event.preventDefault();
    $.ajax({
      url: '/api/users/login',
      method: 'POST',
      data: {
        name: $('.username').val(),
        password: $('.password').val()
      },
      success: function (profile) {
        if (!$('#custom').val()) {
          $('.sidebar_header').append(`<h1 id='custom'>Welcome, ${profile.user}.</h1>`);
        } else {
          $('#custom').css('display', 'inline');
        }
      },
    })
  });

  $('.logout').on('click', function (event) {
    $.ajax({
      url: '/api/users/logout',
      method: 'POST',
      success: function () {
        $('#custom').css('display', 'none');
      }
    })
  });


  //on document.load, create and render map elements (home page), there should be no markers
  //header should show "Explore your world", back button should be hidden

  // var map;
  // bounds = new google.maps.LatLngBounds();


  function initialRender() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 51.5074, lng: -0.1278 },
      zoom: 2
    });
  }


  function initMapNoMarker(maps) {
    mylatLng = { lat: maps.markers[0].lat, lng: maps.markers[0].lng }

    var mapOptions = {
      center: mylatLng // this is from mapID
    }

    var bounds = new google.maps.LatLngBounds();

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    for (var i = 0; i < maps.markers.length; i++) {

      (function (i) {

        var position = new google.maps.LatLng(maps.markers[i].lat, maps.markers[i].lng);
        bounds.extend(position);

        var marker = new google.maps.Marker({
          position: position,
          map: map,
        });

        marker.addListener('click', function () {

          // console.log(position.lat)
          var infoWindow = new google.maps.InfoWindow({ content: maps.markers[i].description, position: position });
          infoWindow.open(map, marker);
          // console.log("clicked!")
        });
      })(i)
    }
    map.fitBounds(bounds);       //# auto-zoom
    map.panToBounds(bounds);     // # auto-center
  }


  function initMap() {
    mylatLng = { lat: 51.5, lng: -0.1 }


    var mapOptions = {
      center: mylatLng, // this is from mapID
      zoom: 2
    }

    var newMarker;
    var bounds = new google.maps.LatLngBounds();

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    map.fitBounds(bounds);       //# auto-zoom
    map.panToBounds(bounds);     // # auto-center

    // listen for a click and run function addMarker on a click:

    google.maps.event.addListener(map, 'click', function (event) {
      if (newMarker) {
        newMarker.setMap(null)
      };

      newMarker = addMarker({ coords: event.latLng });
      $(".marker_coords").val(event.latLng);

    });


    $(".save_marker").on('click', function (event) {
      event.preventDefault();
      var savedMarker = newMarker
      newMarker = null;
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
      return marker;
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
      // console.log(map)
      $(".element_container").append(createMapElement(map));
    }
  }





  //create and render location elements (specific map page) and markers

  $('.element_container').on('click', ".map_element", function (event) {
    $('.element_container').empty(); // if needed
    $('.sidebar_back').css("display", "block")
    // console.log(event.target);
    let mapID = $(event.target).closest('article').data("mapid");
    // console.log(mapID);
    $.ajax({
      method: "GET",
      url: "/maps/search/" + mapID,// locations/points page
      success: function (map) {
        // console.log(map);
        initMapNoMarker(map);
        renderLocationElements(map);
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
    // console.log(obj);
    let mapTitle = obj.title;
    let mapHeader = (`
      <h1 class="sidebar_title">${escape(mapTitle)}</h1>
    `)
    $(".sidebar_header").append(mapHeader);

    for (point of obj.markers) { // point is an object within an array
      // console.log(point)
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
    console.log("create map clicked")
    $(this).css("display", "none");
    $('.element_container').empty();


    let map_form = (`
      <form>
      <textarea class="map_name" name="map_name" placeholder="Map Name"></textarea>

      <input class="save_map" type="button" value="Next">
      <input class="cancel_map" type="button" value="Cancel">
      </form>
      `)

    $(".element_container").append(map_form);

  })


  //save map button //user will only be able to create 1 marker at a time until they click the save marker button
  $(".element_container").on('click', ".save_map", function (event) {
    console.log("clicked save_map")
    event.preventDefault();
    if ($("textarea").val().length === 0) {
      alert("Please Enter Map Name")
    } else {
      $.ajax({
        method: "POST",
        url: "/maps/new",
        data: {title: $("textarea .map_name").val()}
        // success: initMap(map)
      })
      initMap();
      $(".element_container").empty();

      let marker_form = (`
      <form>
      <textarea name="marker_name" placeholder="Marker Name"></textarea>
      <textarea name="marker_details" placeholder="Marker City/Country"></textarea>
      <textarea name="marker_image" placeholder="Marker Image URL"></textarea>
      <textarea name="marker_description" placeholder="Marker Description"></textarea>
      <textarea class="marker_coords" name="marker_coords" placeholder="Marker Coords (to be hidden"></textarea>
      <input class="save_marker" type="submit" value="Save">
      <input class="cancel_map" type="submit" value="Cancel">
      </form>
      `)
      $(".element_container").append(marker_form);
    }
  })


  // cancel button  //clear container, show list of maps page
  $("form").on('click', '.cancel_map', function (event) {
    event.preventDefault();
    console.log("cancel map clicked")
    // $('.element_container').empty(); // if needed
    // $.ajax({
    //   method: "GET",
    //   url: "/maps", // maps page
    //   success: function (map) {
    //     initMap(map); //display world view with list of available maps
    //   }
    // })
  })


  // $(".save_marker").on('click', function (event) {
  //   event.preventDefault();
  //   $.ajax({
  //     method: "POST",
  //     url: "/maps",
  // success: 
  // })
  //clear marker form
  //save marker on the map
  // })






  //when add marker (only when on create map page), display sidebar form
  // $("#map").on('click', function () {
  //   $('.element_container').empty(); // if needed
  // })


})




function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

