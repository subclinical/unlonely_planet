$(document).ready(function () {
  $.ajax({
    url: '/maps',
    method: 'GET',
    success: function (maps) {
      initialRender();
      renderMapElements(maps);
      renderFavouriteMaps(maps);
      renderUserMaps(maps);
    }
  })





  /* ----- Functions ----- */



  function initialRender() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 30, lng: 0 },
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


  function initMapWithMarker() {
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

    var mapOptions = {
      center: { lat: 0, lng: 0 }, // this is from mapID
      zoom: 2
    }

    var newMarker;
    var bounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // listen for a click and run function addMarker on a click:
    google.maps.event.addListener(map, 'click', function (event) {
      if (newMarker) {
        newMarker.setMap(null)
      };

      newMarker = addMarker({ coords: event.latLng });
      $(".marker_lat").val(event.latLng.lat);
      $(".marker_lng").val(event.latLng.lng);
    });

    $(".element_container").on('click', ".save_marker", function (event) {
      event.preventDefault();
      var savedMarker = newMarker
      newMarker = null;
      $.ajax({
        method: "POST",
        url: "/maps/marker",
        data: {
          label: $(".marker_name").val(),
          city: $(".marker_details").val(),
          image: $(".marker_image").val(),
          description: $(".marker_description").val(),
          lat: $(".marker_lat").val(),
          lng: $(".marker_lng").val(),
        }
      })
    });
  }


  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
    $(".header_text").empty();
    $(".header_text").append(mapHeader);
    for (map of array) { // point is an object within an array
      // console.log(map)
      $(".element_container").append(createMapElement(map));
    }
  }


  function renderFavouriteMaps(obj) {
    $("remove_favourite").css("display", "block");
    for (map of obj.favourites) { //obj.favourites is an array
      console.log(map)
      $(".favourite_maps").append(createMapElement(map));
    }
  }


  function renderUserMaps(obj) {
    $("delete_map").css("display", "block");
    for (map of obj.maps) { //obj.maps is an array, this points to the maps generated by the user
      console.log(map)
      $(".user_maps").append(createMapElement(map));
    }
  }


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


  function createLocationElementPlus(marker) { //this function renders location elements along with edit and delete button along each of them, this function is only used in renderUserLocationElements
    let point_Id = marker.id;
    let point_label = marker.label;
    let point_description = marker.description;

    pointElement = (`
      <article class="point_element" data-pointID="${escape(point_Id)}">
      <img class="location_pic" src="">
      <span class="point_element_description"> ${escape(point_label)} </span>
      <button class="edit_marker">Edit</button>
      <button class="delete_marker">Delete</button>
      </article>
    `);
    return pointElement;
  };


  function renderLocationElements(obj) {
    let mapTitle = obj.title;
    let mapHeader = (`
      <h1 class="sidebar_title">${escape(mapTitle)}</h1>
    `)
    $(".header_text").empty();
    $(".header_text").append(mapHeader);

    for (point of obj.markers) { // point is an object within an array
      // console.log(point)
      $(".element_container").append(createLocationElement(point)); //render location elements to one of three div container: element_container(for hard-coded maps), user_maps(for user-created maps), favourite_maps(for favourited maps). The other 2 div will be empty
    }
  }


  function renderUserLocationElements(obj) {
    let mapTitle = obj.title;
    let mapHeader = (`
      <h1 class="sidebar_title">${escape(mapTitle)}</h1>
    `)
    $(".header_text").empty();
    $(".header_text").append(mapHeader);

    for (point of obj.markers) { // point is an object within an array
      // console.log(point)
      $(".user_maps").append(createLocationElementPlus(point)); //render location elements to one of three div container: element_container(for hard-coded maps), user_maps(for user-created maps), favourite_maps(for favourited maps). The other 2 div will be empty
    }
  }


  function renderFavouriteLocationElements(obj) {
    let mapTitle = obj.title;
    let mapHeader = (`
      <h1 class="sidebar_title">${escape(mapTitle)}</h1>
    `)
    $(".header_text").empty();
    $(".header_text").append(mapHeader);

    for (point of obj.markers) { // point is an object within an array
      // console.log(point)
      $(".favourite_maps").append(createLocationElement(point)); //render location elements to one of three div container: element_container(for hard-coded maps), user_maps(for user-created maps), favourite_maps(for favourited maps). The other 2 div will be empty
    }
  }


  function renderLocationDetails(obj) {
    let locationDescription = obj.markers.description;
    let point_label = obj.markers.label;

    let locationHeader = (`
      <h1 class="sidebar_title">${escape(point_label)}</h1>
    `)

    locationContent = (`
    <p>${escape(locationDescription)}</p>
  `);
    $(".header_text").empty();
    $(".panel_content").empty();
    $(".header_text").append(locationHeader);
    $(".panel_content").append(locationContent);
  };





  /* ----- Event Listeners ----- */


  $('.reg').on('click', function (event) {
    $.ajax({
      url: '/api/users/register',
      method: 'POST',
      data: {
        name: $('.username').val(),
        password: $('password').val(),
        success: function () {
          console.log('User registered.');
        }
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
          $('.user_info').append(`<h4 id='custom'>Logged in as: ${profile.user}.</h4>`);
          renderUserMaps(profile);
          renderFavouriteMaps(profile);
        } else {
          $('#custom').css('display', 'inline');
          renderUserMaps(profile);
          renderFavouriteMaps(profile);
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


  //on click (of "sidebar_back" button), render "home page"
  $(".sidebar_header").on('click', ".sidebar_back", function (maps) {
    event.preventDefault();
    $('.element_container').empty();
    console.log("back clicked");
    $.ajax({
      url: '/maps',
      method: 'GET',
      success: function (maps) {
        initialRender();
        renderMapElements(maps);
        renderFavouriteMaps(maps);
        renderUserMaps(maps);
      }
    })
  })




  //on click (of a hard-coded/seed map), render location elements and markers
  $('.element_container').on('click', ".map_element", function (event) {
    $('.element_container').empty();
    $('.sidebar_back').css("display", "block")

    let mapID = $(event.target).closest('article').data("mapid");
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


  //on click (of a user-created map), render location elements and markers
  $('.user_maps').on('click', ".map_element", function (event) {
    $('.element_container').empty(); // if needed
    $('.sidebar_back').css("display", "block")

    let mapID = $(event.target).closest('article').data("mapid");
    $.ajax({
      method: "GET",
      url: "/maps/search/" + mapID,// was /maps/edit (need to verify)
      success: function (map) {
        initMapNoMarker(map);
        renderUserLocationElements(map); //this will show list of locations along with edit/delete button for each element
      }
    })
  })


  //on click (of a favourited map), render location elements and markers
  $('.favourite_maps').on('click', ".map_element", function (event) {
    $('.element_container').empty(); // if needed
    $('.sidebar_back').css("display", "block")

    let mapID = $(event.target).closest('article').data("mapid");
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


  //on click (of "Create a Map" button), append/display form to sidebar
  $(".sidebar_header").on('click', ".create_map", function () {
    $(this).css("display", "none");
    $('.element_container').empty();

    let map_form = (`
      <form>
      <textarea class="map_name" name="map_name" placeholder="Map Name"></textarea>
      <textarea class="map_image" name="map_image" placeholder="Map Image URL"></textarea>
      <button class="next">Next</button>
      <button class="cancel_map">Cancel</button>
      </form>
      `)
    $(".element_container").append(map_form);
  })


  //on click (of "Next" button), allow user to add markers, and display form for marker's details
  $(".element_container").on('click', ".next", function (event) {
    event.preventDefault();
    console.log($(".map_name").val())
    if ($(".map_name").val().length === 0) {
      alert("Please Enter Map Name")
    } else {
      $.ajax({
        method: "POST",

        url: "/maps/new",
        data: {
          title: $(".map_name").val(),
          map_image: $(".map_image").val()
        },
      })
      initMapWithMarker();
      $(".element_container").empty();

      let marker_form = (`
      <form>
      <textarea class="marker_name" name="marker_name" placeholder="Marker Name"></textarea>
      <textarea class="marker_details"name="marker_details" placeholder="Marker City/Country"></textarea>
      <textarea class="marker_image"name="marker_image" placeholder="Marker Image URL"></textarea>
      <textarea class="marker_description" name="marker_description" placeholder="Marker Description"></textarea>
      <textarea class="marker_lat" name="marker_lat" placeholder="Marker Lat (to be hidden"></textarea>
      <textarea class="marker_lng" name="marker_lng" placeholder="Marker Lng (to be hidden"></textarea>
      <button class="save_marker">Save</button>
      <button class="cancel_map">Cancel</button>
      </form>
      `)
      $(".element_container").append(marker_form);
    }
  })


  //on click (of "save marker" button), POST marker data to /marker 
  //NEED TO VERIFY: if specific marker data will be added to the new map created
  $(".element_container").on('click', ".save_marker", function (event) {
    event.preventDefault();
    let mapID = $(event.target).closest('article').data("mapid");
    let pointID = $(event.target).closest('article').data("pointID");
    $.ajax({
      method: "POST",
      url: "/maps/marker/" + pointID,
      data: {
        map_id: mapID,
        label: $(".marker_name").val(),
        city: $(".marker_details").val(),
        image: $(".marker_image").val(),
        description: $(".marker_description").val(),
        lat: $(".marker_lat").val(),
        lng: $(".marker_lng").val(),
      }
    })
  })



  //on click (of "edit marker" button) inside a specific user-created map, display form to edit that marker's data
  $('.user_maps').on('click', ".edit_marker", function (event) {
    $('.element_container').empty();

    let marker_form = (`
      <form>
      <textarea class="marker_name" name="marker_name" placeholder="Marker Name"></textarea>
      <textarea class="marker_details"name="marker_details" placeholder="Marker City/Country"></textarea>
      <textarea class="marker_image"name="marker_image" placeholder="Marker Image URL"></textarea>
      <textarea class="marker_description" name="marker_description" placeholder="Marker Description"></textarea>
      <textarea class="marker_lat" name="marker_lat" placeholder="Marker Lat (to be hidden"></textarea>
      <textarea class="marker_lng" name="marker_lng" placeholder="Marker Lng (to be hidden"></textarea>
      <button class="save_edited_marker">Save</button>
      <button class="cancel_map">Cancel</button>
      </form>
      `)
    $(".element_container").append(marker_form);
  })


  //on click (of "save edited marker" button), PUT edited marker data to /maps/marker/edit/:id
  //then render/refresh the map and list of locations 
  $('.user_maps').on('click', ".save_edited_marker", function (event) {

    let mapID = $(event.target).closest('article').data("mapid");
    let pointID = $(event.target).closest('article').data("pointID");
    $.ajax({
      method: "PUT",
      url: "/maps/marker/edit/" + pointID,
      data: {
        label: $(".marker_name").val(),
        city: $(".marker_details").val(),
        lat: $(".marker_lat").val(),
        lng: $(".marker_lng").val(),
        description: $(".marker_description").val(),
        image: $(".marker_image").val()
      },
      success: function (map) {
        initMapWithMarker(map);
        renderLocationElements(map);
      }
    })
  })


  //on click (of "delete marker" button), delete a marker
  //then render/refresh the map and list of locations 
  $('.user_maps').on('click', ".delete_marker", function (event) {
    $('.element_container').empty();

    let mapID = $(event.target).closest('article').data("mapid");
    let pointID = $(event.target).closest('article').data("pointID");
    $.ajax({
      method: "DELETE",
      url: "/maps/marker/delete/" + pointID,
      success: function (map) {
        initMapWithMarker(map);
        renderLocationElements(map);
      }
    })
  })


  //on click (of "delete map" button), delete map
  //then render/refresh "home page" 
  $('.user_maps').on('click', ".delete_map", function (event) {
    $('.element_container').empty();
    $(this).css("display", "none");

    let mapID = $(event.target).closest('article').data("mapid");
    $.ajax({
      method: "DELETE",
      url: "/maps/delete/" + mapID,
      success: function (map) {
        initialRender();
        renderMapElements(maps);
        renderFavouriteMaps(maps);
        renderUserMaps(maps);
      }
    })
  })


  //THIS ROUTE NEEDS TO BE ADDED
  //on click (of "delete favourite map" button), delete map
  //then render/refresh "home page" 
  $('.favourite_maps').on('click', ".remove_favourite", function (event) {
    $('.element_container').empty();
    $(this).css("display", "none");

    let mapID = $(event.target).closest('article').data("mapid");
    $.ajax({
      method: "DELETE",
      url: "/maps/favourite/delete/" + mapID,// locations/points page
      success: function (map) {
        initialRender();
        renderMapElements(maps);
        renderFavouriteMaps(maps);
        renderUserMaps(maps);
      }
    })
  })


  //on click (of a specific location in a map), render location details
  $(".element_container").on('click', ".location_element", function () {
    $('.element_container').empty(); // if needed
    $('.sidebar_back').css("display", "block")
    let pointID = $(event.target).closest('article').data("pointID");
    $.ajax({
      method: "GET",
      url: "/maps/search/" + pointID, //  location details page
      success: renderLocationDetails
    })
  })


  //on click (of "cancel" button)
  //clear container, show list of maps page ("home page")
  $(".element_container").on('click', '.cancel_map', function (event) {
    event.preventDefault();
    $('.element_container').empty(); // if needed
    $(".create_map").css("display", "block");
    console.log("cancel map clicked")
    $.ajax({
      url: '/maps',
      method: 'GET',
      success: function (maps) {
        initialRender();
        renderMapElements(maps);
      }
    })
  })


}) //end of document.ready




// To-dos
// on mouseover, display marker's infoWindow 
// on mouseleave, hide marker's infoWindow