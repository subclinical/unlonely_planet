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
  console.log(pointElement);
  return pointElement;
};


function renderPoints(array) {
  console.log("renderPoints function invoked")
  for (point of array) { // point is an object within an array
    console.log(point);
    $(".point_element_container").append(createPointElement(point));
  }
}


let sample = [
  {
    description: "Palace2",
    location: "London"
  },
  {
    description: "Waterfall",
    location: "Sydney"
  }
];

renderPoints(sample);


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
