// on mouseover, display marker's infoWindow 
// on mouseleave, hide marker's infoWindow
$(document).ready(function () {
  $.ajax({
    url: '/maps',
    method: 'GET',
    success: function (maps) {
      initialRender();
      renderMapElements(maps);
    }
  })


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
        url: "/marker",
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



  // //when logged in, 
  // let sampleOutput =
  //   {
  //     user: 'Danny',
  //     maps: [anonymous {
  //       id: 1,
  //       title: "Top 5 Restaurants",
  //       date: "2009-09-01",
  //       image: "google.com"
  //     },
  //       {
  //         id: 2,
  //         title: "Top 2 Movie Theaters",
  //         date: "2018-01-22",
  //         image: "cineplex.com"
  //       }
  //     ],
  //     favourites: [anonymous {
  //       id: 1,
  //       title: "Top 5 Places in Paris",
  //       date: "2008-12-30",
  //       image: "paris.com"
  //     },
  //       {
  //         id: 2,
  //         title: "Top 3 Places in Rome",
  //         date: "2007-09-12",
  //         image: "rome.com"
  //       }
  //     ]
  //   }


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
    <button class="create_map">Create Map</button>
    `)
    $(".sidebar_header").empty();
    $(".sidebar_header").append(mapHeader);
    for (map of array) { // point is an object within an array
      // console.log(map)
      $(".element_container").append(createMapElement(map));
    }
  }


  function renderFavouriteMaps(obj) {
    for (map of obj.favourites) { //obj.favourites is an array
      console.log(map)
      $(".favourite_maps").append(createMapElement(map));
    }
  }


  function renderUserMaps(obj) {
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


  function createLocationElementPlus(marker) {
    let point_Id = marker.id;
    let point_label = marker.label;
    let point_description = marker.description;

    pointElement = (`
      <article class="point_element" data-pointID="${escape(point_Id)}">
      <img class="location_pic" src="">
      <span class="point_element_description"> ${escape(point_label)} </span>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
      </article>
    `);
    return pointElement;
  };


  function renderLocationElements(obj) {
    let mapTitle = obj.title;
    let mapHeader = (`
      <h1 class="sidebar_title">${escape(mapTitle)}</h1>
    `)
    $(".sidebar_header").empty();
    $(".sidebar_header").append(mapHeader);

    for (point of obj.markers) { // point is an object within an array
      // console.log(point)
      $(".element_container").append(createLocationElement(point));
    }
  }


  function renderUserLocationElements(obj) {
    let mapTitle = obj.title;
    let mapHeader = (`
      <h1 class="sidebar_title">${escape(mapTitle)}</h1>
    `)
    $(".sidebar_header").empty();
    $(".sidebar_header").append(mapHeader);

    for (point of obj.markers) { // point is an object within an array
      // console.log(point)
      $(".user_maps").append(createLocationElementPlus(point));
    }
  }


  function renderFavouriteLocationElements(obj) {
    let mapTitle = obj.title;
    let mapHeader = (`
      <h1 class="sidebar_title">${escape(mapTitle)}</h1>
    `)
    $(".sidebar_header").empty();
    $(".sidebar_header").append(mapHeader);

    for (point of obj.markers) { // point is an object within an array
      // console.log(point)
      $(".favourite_maps").append(createLocationElement(point));
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
    $(".sidebar_header").empty();
    $(".panel_content").empty();
    $(".sidebar_header").append(locationHeader);
    $(".panel_content").append(locationContent);
  };




  //Edit Marker
  //On click, any map element
  //If user clicked a map that belongs to the "UserMaps" container, render location elements WITH edit/delete button


  //Edit button, on click
  //render form with corresponding location details 


  //Delete button, on click
  //





  //Create new map
  $(".sidebar_header").on('click', ".create_map", function () {
    console.log("create map clicked")
    $(this).css("display", "none");
    $('.element_container').empty();

    let map_form = (`
      <form>
      <textarea class="map_name" name="map_name" placeholder="Map Name"></textarea>
      <textarea class="map_image" name="map_image" placeholder="Map Image URL"></textarea>
      <button class="save_map">Next</button>
      <button class="cancel_map">Cancel</button>
      </form>
      `)
    $(".element_container").append(map_form);
  })




  /* ----- In Progress ----- */

  //create and render location elements and markers (for HC maps)
  $('.element_container').on('click', ".map_element", function (event) {
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

  //create and render location elements and markers (for user maps)
  $('.user_maps').on('click', ".map_element", function (event) {
    $('.element_container').empty(); // if needed
    $('.sidebar_back').css("display", "block")

    let mapID = $(event.target).closest('article').data("mapid");
    $.ajax({
      method: "GET",
      url: "/maps/edit/" + mapID,// locations/points page
      success: function (map) {
        // console.log(map);
        initMapNoMarker(map);
        renderLocationElements(map);
      }
    })
  })


  //create and render location elements and markers (for HC maps)
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


  /* ----- ---------- ----- */










  //create and render location details (specific location page)
  $(".element_container").on('click', ".location_element", function () {
    $('.element_container').empty(); // if needed
    $('.sidebar_back').css("display", "block")
    let locationID = $(this).data("locationID")
    $.ajax({
      method: "GET",
      url: "/maps/search/" + locationID, //  location details page
      success: renderLocationDetails
    })
  })


  //save map button //user will only be able to create 1 marker at a time until they click the save marker button
  $(".element_container").on('click', ".save_map", function (event) {
    console.log("clicked save_map")
    event.preventDefault();
    console.log($(".map_name").val())
    if ($(".map_name").val().length === 0) {
      alert("Please Enter Map Name")
    } else {
      $.ajax({
        method: "POST",
        url: "/new",
        data: {
          title: $(".map_name").val(),
          map_image: $(".map_image").val()
        },
        // success: initMap
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


  // cancel button  //clear container, show list of maps page
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


  $(".element_container").on('click', ".save_marker", function (event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/marker",
      data: {
        label: $(".marker_name").val(),
        city: $(".marker_details").val(),
        image: $(".marker_image").val(),
        description: $(".marker_description").val(),
        lat: $(".marker_lat").val(),
        lng: $(".marker_lng").val(),
      }
    })
  })



  // $(".sidebar_header").on('click', '.sidebar_back', function (event) {
  //   event.preventDefault();
  //   $('.element_container').empty(); // if needed
  //   $(".create_map").css("display", "block");
  //   console.log("back button clicked")
  //   $.ajax({
  //     url: '/maps',
  //     method: 'GET',
  //     success: function (maps) {
  //       initialRender();
  //       renderMapElements(maps);
  //     }
  //   })
  // })


}) //end of document.ready (DO NOT MOVE)



