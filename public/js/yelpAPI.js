$(document).ready(() => {

  $('#searchYelpButton').on('click', (e) => {
    e.preventDefault();
    let searchText = $('#searchText').val();
    let searchTodo = $('#searchTodo').val();
    if (searchText == "") {
      searchText = 'New York, NY';
    }
    if (searchTodo == "") {
      searchTodo = 'food';
    }
    console.log("BUTTON search text --- " + searchText + " at todo " + searchTodo);
    getYelpTodo(searchTodo, searchText);
  });

  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    if (searchText == "") {
      searchText = 'New York, NY';
    }
    getYelpInfo(searchText);
    e.preventDefault();
  });

  $('#searchMore').on('submit', (event) => {
    event.preventDefault();
    let searchTodo = $('#searchTodo').val();
    let searchLocation = $('#searchText').val();
    if (searchTodo == "") {
      searchTodo = 'sightseeing';
    }
    if (searchLocation == "") {
      searchLocation = 'New York, NY';
    }
    console.log("search Todo --- " + searchTodo + " at location " + searchLocation);
    getYelpTodo(searchTodo, searchLocation);
  });

});

function getYelpInfo(searchText) {
  console.log(searchText);
  var settings = {
    "url": `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&location=${searchText}`,
    "method": "GET",
    "sort_by": "review_count",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer BdJJtqLJAbXg46LvAvsUxVIFGDcTm1OLpdNFVi3c47LfyPltqjhffRyvyUCd0IPXhZuG3N2KOrn0faY1QG0lK412AkBNE9zFsAhYc1MgntcV7V0_veyQD9Aytqo0X3Yx",
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    let restaurants = response.businesses;
    let output = '';
    $.each(restaurants, (index, restaurant) => {
      console.log("The raw restaurant rating = ", restaurant.rating);
      let rating = Math.round(restaurant.rating);
      console.log("The restaurant rating = ", rating);
      if(rating > 4){
        rating = 4;
      };
      output += `
      <div class="card">
        <div class="image">
          <img src="${restaurant.image_url}" height="217px">
        </div>
        <div class="extra">
          Rating
          <div class="ui star rating" data-rating="${rating}"></div>
          <script>
            $(document).ready(function () { $(".rating").rating(); })
          </script>
        </div>
        <div class="content">
          <a class="header" href="${restaurant.url}">${restaurant.name}</a>
          <div class="description">
            <strong>Address:</strong><br>
            ${restaurant.location.display_address}<br>
            <strong>Reviews:</strong>&nbsp;${restaurant.review_count}<br>
            <strong>Price:</strong>&nbsp;${restaurant.price}
          </div>
          <div class="extra content">
            <button onclick="restaurantSelected('${restaurant.id}')" class="ui button">Restaurant details</button>
          </div>
        </div>
      </div>
      `;
      
            //   `
            //   <div class="col-md-3">
            //   <div class="well text-center">
            //     <img src="${restaurant.image_url}">
            //     <a href=${restaurant.url} target="_blank"><h7>${restaurant.name} </h7></a>
            //     <h4>${restaurant.location.display_address}</h4>
            //     <h4>Ratings= ${restaurant.rating} || Number of reviews= ${restaurant.review_count}</h4>
            //     <h7>${restaurant.price}</h7>
            //     <a onclick="restaurantSelected('${restaurant.id}')" class="btn btn-primary" href="#">Restaurant details</a>
            //   </div>
            // </div>
            //   `;
    });
    $('#yelp').html(output);
  }).catch((err) => {
    console.log(err);
  });
}


function getYelpTodo(searchTodo, searchLocation) {
  console.log(searchText);
  var settings = {
    "url": `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchTodo}&location=${searchLocation}`,
    "method": "GET",
    "sort_by": "review_count",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer BdJJtqLJAbXg46LvAvsUxVIFGDcTm1OLpdNFVi3c47LfyPltqjhffRyvyUCd0IPXhZuG3N2KOrn0faY1QG0lK412AkBNE9zFsAhYc1MgntcV7V0_veyQD9Aytqo0X3Yx",
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    let activity = response.businesses;
    let output = '';
    $.each(activity, (index, activity) => {
      console.log("The raw restaurant rating = ", activity.rating);
      let rating = Math.round(activity.rating);
      console.log("The restaurant rating = ", rating);

      if(rating > 4){
        rating = 4;
      };
      output += `
                <div class="card">
                  <div class="image">
                    <img src="${activity.image_url}" height="217px">
                  </div>
                  <div class="extra">
                    Rating
                    <div class="ui star rating" data-rating="${rating}"></div>
                    <script>
                      $(document).ready(function () { $(".rating").rating(); })
                    </script>
                  </div>
                  <div class="content">
                    <a class="header" href="${activity.url}" target="_blank">${activity.name}</a>
                    <div class="description">
                      <strong>Address:</strong><br>
                      ${activity.location.display_address}<br> 
                      <strong>Reviews:</strong>&nbsp;${activity.review_count}<br>
                    </div>
                    <div class="extra content">
                      <button onclick="restaurantSelected('${activity.id}')" class="ui button">Activity details</button>
                    </div>
                  </div>
                </div>
                `;
      
            //   `
            //   <div class="col-md-3">
            //   <div class="well text-center">
            //     <img src="${activity.image_url}">
            //     <a href=${activity.url} target="_blank"><h7>${activity.name} </h7></a>
            //     <h4>${activity.location.display_address}</h4>
            //     <h4>Ratings= ${activity.rating} || Number of reviews= ${activity.review_count}</h4>
            //     <a onclick="restaurantSelected('${activity.id}')" class="btn btn-primary" href="#">Activity details</a>
            //   </div>
            // </div>
            //   `;
    });
    $('#yelp').html(output);
  }).catch((err) => {
    console.log(err);
  });
}

function restaurantSelected(id) {
  sessionStorage.setItem('restaurantId', id);
  console.log(id);
  window.location = 'restaurant.html';
  return false;
}

function getRestaurant() {
  console.log('getRestaurant info!!!!');
  let restaurantId = sessionStorage.getItem('restaurantId');

  var settings = {
    "url": `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${restaurantId}/reviews`,
    "method": "GET",
    "timeout": 0,
    // "limit": 5,
    "headers": {
      "Authorization": "Bearer BdJJtqLJAbXg46LvAvsUxVIFGDcTm1OLpdNFVi3c47LfyPltqjhffRyvyUCd0IPXhZuG3N2KOrn0faY1QG0lK412AkBNE9zFsAhYc1MgntcV7V0_veyQD9Aytqo0X3Yx",
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    let review = response.reviews;
    let output = '';
    $.each(review, (index, reviews) => {
      console.log('response for review.url' + reviews.url);
      output += `
                <div class="item">
                  <div class="image">
                    <img src="${reviews.user.image_url}" >
                  </div>
                  <div class="content">
                    <div class="header"><strong>User Name:</strong>&nbsp;${reviews.user.name}</div>
                    <div class="meta">
                      <span>Review:</span>
                    </div>
                    <div class="description">
                      <p>${reviews.text}</p>
                    </div>
                    <div class="extra">
                    <a href=${reviews.url} target="_blank" class="btn btn-primary">View On Yelp</a>
                    </div>
                    <div class="extra">
                      <button class="ui inverted button">
                      <a href="/index.html">Go Back To Search</a>
                      <i class="right chevron icon"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="ui inverted divider"></div>
                `;
      
          //   `
          //   <div class="row">
          //     <div class="col-md-4">
          //     <img src="${reviews.user.image_url}" class="img-thumbnail" width="250px">
          //     </div>
          //     <div class="col-md-8">
          //       <a href=${reviews.user.profile_url} target="_blank"> User Yelp Profile</a>
          //       <ul class="list-group">
          //       <li class="list-group-item"><strong>User Name:</strong> ${reviews.user.name}</li>
          //         <li class="list-group-item"><strong>time_created:</strong> ${reviews.time_created}</li>
          //         <li class="list-group-item"><strong>Ratings:</strong> ${reviews.rating}</li>
          //       </ul>
          //       <h7>Reviews: </h7>
          //       ${reviews.text}
          //       <a href=${reviews.url} target="_blank" class="btn btn-primary">View On Yelp</a>
          //       <a href="index.html" class="btn btn-default">Go Back To Search</a>
          //       <hr>
          //     </div>
          //   </div>
          // `;
    });
    $('#restaurant').html(output);
  })
    .catch((err) => {
      console.log(err);
    });
}
