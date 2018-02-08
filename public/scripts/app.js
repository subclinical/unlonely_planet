$(document).ready(function () {

  // on mouseover, display marker's infoWindow 
  // on mouseleave, hide marker's infoWindow

  /* ----- Ajax ----- */

  // scenario: user visits home page and will be greeted with a list of maps to choose from

  // renderMapElements(sampleMaps);


  // scenario: user clicks on a map element, render list of locations

  //   $(document).on('click', ".map_element", function() {
  //   $('.map_element').empty(); // if needed
  //     $.ajax ({
  //       method: "GET",
  //       url: "/locations", // locations/points page
  //       success: renderLocationElements 
  //     })
  //   }


  //   //scenario: user clicks on a location element, render location details 

  // $(document).on('click', ".location_element", function() {
  //   $('.location_element').empty(); // if needed
  //     $.ajax ({
  //       method: "GET",
  //       url: "/location_details", //  location details page
  //       success: renderLocationDetails
  //     })
  //   }




  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  /* ----- Map ----- */

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



  /* ----- Map Elements ----- */



  let sampleMaps = [
    {
      id: 1,
      title: 'Top 5 Restaurants',
      city: 'Toronto',            //new column
      lat: 43.6532,
      lng: -79.3832,
      zoom: 8,
      creator_id: 1,
      date_created: new Date()
    },
    {
      id: 2,
      title: 'Top 3 Must-Sees',
      city: 'Paris',
      lat: 48.8566,
      lng: 2.3522,
      zoom: 8,
      creator_id: 2,
      date_created: new Date()
    }
  ];


  function createMapElement(obj) {
    let mapId = obj.id;
    let mapTitle = obj.title;
    let mapCity = obj.city;

    mapElement = (`
    <article class="map_element" data-mapID="${escape(mapId)}">
    <img class="location_pic" src="/images/location.png">
      <span class="map_element_title"> ${escape(mapTitle)} </span>
      <span class="map_element_city"> ${escape(mapCity)} </span>
    </article>
    `)
    return mapElement;
  }

  function renderMapElements(array) {
    // console.log("invoked renderMapElements")
    for (map of array) { // point is an object within an array
      $(".element_container").append(createMapElement(map));
    }
  }

  // renderMapElements(sampleMaps);




  /* ----- Location Elements ----- */


  let samplePoints = [
    {
      id: 1,
      map_id: 1,
      label: 'Restaurant 1 in Toronto',
      lat: 43.6532,
      lng: -79.3832,
      user_id: 1,
      date_created: new Date(),
      description: 'This place is THE place to be... sometimes.'
    },
    {
      id: 2,
      map_id: 2,
      label: 'Restaurant 1 in Paris',
      lat: 48.8566,
      lng: 2.3522,
      user_id: 2,
      date_created: new Date(),
      description: 'This place is THE place to be... sometimes.'
    }
  ];


  function createPointElement(obj) {
    let point_Id = obj.id;
    let point_description = obj.label;
    // let point_location = obj.location;


    pointElement = (`
  
  <article class="point_element" data-pointID="${escape(point_Id)}">
  <img class="location_pic" src="/images/location.png">
  <span class="point_element_description"> ${escape(point_description)} </span>
 
  </article>
  `);

    return pointElement;
  };


  function renderLocationElements(array) {
    //this needs to display the title of the map based on id
    header = (`
      <a href="/points" <i class="fas fa-chevron-left"></i></a>
      <h1 class="sidebar_title">HC: Top Restaurants</h1>
    `)

    $(".sidebar_header").append(header);
    for (point of array) { // point is an object within an array
      $(".element_container").append(createPointElement(point));
    }
  }


  renderLocationElements(samplePoints);




  /* ----- Location Details ----- */



  let sampleDetails = [
    {
      location:
        {
          name: "The Shard",
          description: "Skyscraper in London"
        }
    },
    {
      location:
        {
          name: "The Palace",
          description: "Royal Palace in London"
        }
    }
  ];

  function createLocationHeader(obj) {
    let location_name = obj.location.name;
    // console.log(obj.location)

    LocationHeader = (`
  <header class="sidebar_header">
  <a href="/points" class="location-subtitle"><i class="fas fa-chevron-left"></i>"</a>    
  <h3 class="back_button">Back Button</h3>
    <h1 class="sidebar_title">${escape(location_name)}</h1>
  </header>
  `);
    return LocationHeader;
  }


  function createLocationContent(obj) {
    let location_description = obj.location.description;

    LocationContent = (`
    <p>${escape(location_description)}</p>
  `);

    return LocationContent;
  };


  function renderLocationDetails(string) {
    console.log("renderLocationDetails invoked")
    $(".sidebar").append(createLocationHeader(string));
    $(".panel_content").append(createLocationContent(string));
  };


  // renderLocationDetails(sampleDetails)


})


