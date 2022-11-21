// window.onload = function (){
//   if(window.jQuery){
//     alert("yeah")
//   }
// }
//
var input = document.querySelector("input");
var timeEl = $(".date");
var currentTime = moment().format("dddd MMMM Do [at] LT");
console.log(currentTime);
timeEl.text(currentTime);
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // location.reload();
    // document.body.innerHTML=''
    // clearPage(); //this needs corredction.
    createWeatherDisplay(event.target.value);
    // addToHistory(event.target.value);
// addToHistory();
    // displayHistory();
  }
});

// function clearPage() {

// }

// function displayHistory() {
//   var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
//   // var previousSearchHistory = localStorage.getItem("history");
//   // if (previousSearchHistory) {
//   //   previousSearchHistory = JSON.parse(previousSearchHistory);
//   // } else {
//   //   previousSearchHistory = [];
//   // }

//   for (var i = 0; i < searchHistory.length; i++) {
//     var historybtn = document.createElement("button");
//     var historyItem = previousSearchHistory[i];
//     historybtn.textContent = historyItem;
//     historybtn.addEventListener("click", function (event) {
//       createWeatherDisplay(event.target.textContent);
//     });
//     $(".history").append(historybtn);
//     //     document.body.appendChild(historybtn);
//     //     $('.weather').text(currentWeatherStatement)
//     // $('#img').append(image)
//   }
// }

function addToHistory(location) {
  var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
  console.log(searchHistory);
  // for (var i=0; i<searchHistory.length;i++){
  //   if(searchHistory === location){
  //     return;
  //   }
  //   searchHistory.push(location);
  //   localStorage.setItem('history', JSON.stringify(searchHistory));
  // }

  for (var i = 0; i < searchHistory.length; i++) {
    // <------> Question about localStorage
if(searchHistory[i] === location){
    // if (searchHistory.includes(location)) {
      return;
    }
    // }
    //   searchHistory.push(location);
    //   localStorage.setItem("history", JSON.stringify(searchHistory));

  }
    // else {
      searchHistory.push(location);
    // searchHistory = [location];
    localStorage.setItem("history", JSON.stringify(searchHistory));
    // }
}

// }
// var searchHistory = localStorage.getItem("history");
// if (searchHistory) {
//   searchHistory = JSON.parse(searchHistory);
//   if (searchHistory.includes(location)) {
//     return;
//   }

//   searchHistory.push(location);
//   localStorage.setItem("history", JSON.stringify(searchHistory));
// } else {
//   searchHistory = [location];
//   localStorage.setItem("history", JSON.stringify(searchHistory));
// }
// }}
// function clearPage(){
//   document.body.innerHTML = ''
// }
var API_key = "d7e0beaf6048af6805ba0b615e62bf01";
//This function returns a promise which is fetch to Geocoding API to grab the location. Query is location and limit is 5 to fetch only 5 location based on query
function getGeoLocation(query, limit = 5) {
  //put this as a function so we can call this anytime query is the location passed in the function, 5 is the limit of results
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_key}`
  );
}
function getCurrentWeather(arguments) {
  //arguments are lat and lon  where the retured value of the of lat and lon passed into the function
  return fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${arguments.lat}&lon=${
      arguments.lon
    }&units=${"imperial"}&lang=${"en"}&appid=${API_key}`
  );
}

// clearPage () => {document.body.innerHTML=''}

$(".error").hide();

function createWeatherDisplay(location) {
  // clearPage()
  // addToHistory(location);
  //create function to remove inner HTML ---->
  return getGeoLocation(location) //Get location, which is Riverside, a function that retruns a promise, which is a fetch to the api geolocation
    .then((response) => response.json()) //then the response from api is parsed to JavaScript object

    .then((data) => {
      if (data.length === 0) {
        var errorEl = document.createElement("p");
        errorEl.textContent = `We could not find ${location}`;
        $(".error").show();
        setTimeout(function () {
          $(".error").hide();
        }, 3000);
        // $('.error').append(errorEl)
        // document.body.appendChild(errorEl);
      } else {
        // var { lat, lon } = data[0]; //data is a array, setting data to index 0 to grab the first lat and lon from the results of getGeoLocation ("Riversive") funciton.
        // console.log(data[0].lat)
        console.log(data);
        //document.body.textContent = JSON.stringify(data, null, 2)   //stringify the data to convert the object into a string.
        //then the data received can be used to
        getCurrentWeather({ lat: data[0].lat, lon: data[0].lon }) //the argument lat and lon with data [0] passed into the getCurrentWeather function.
          //getCurrentWeather({ lat, lon }) //function to grab current weather based on lat and the lon we determined
          .then((weatherResponse) => weatherResponse.json()) //parse the response received from getCurrentWeather  the wriiten function same as writing .then (function(weatherResponse){weatehrResonse.json()})

          .then((weatherData) => {
            // var weatherPicture = document.createElement("img");
            var weatherPicture = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;
            var image = new Image();
            image.src = weatherPicture;
            // var currentWeatherStatement = document.createElement("p");
            var currentWeatherStatement = `The current weather is ${weatherData.current.weather[0].main}, with ${weatherData.current.weather[0].description}, and temperature of ${weatherData.current.temp} degrees`;
            console.log(currentWeatherStatement);
            // document.body.textContent = JSON.stringify(weatherData, null, 2);  //stringfy data and print the data to screen.
            console.log(weatherData);
            console.log(weatherData.current.weather[0].main);
            console.log(weatherData.current.weather[0].description);
            console.log(weatherData.current.temp);
            $(".weather").html(currentWeatherStatement);
            // $('#img').append(image)
            // const weatherStatement = document.querySelector(".weather");
            // const pic = document.querySelector('img');
            // weatherStatement.textContent = currentWeatherStatement;
            // document.querySelector('.weather').appendChild (currentWeatherStatement);
            // const weather = document.querySelector(".weather");
            // weather.textContent = currentWeatherStatement;
            // document.querySelector('img').innerHTML = weatherPicture;
            // $('.img').append(weatherPicture);
            // $('.weather').appendChild(currentWeatherStatement);
            // document.body.appendChild(weatherPicture);
            // document.getElementById('#img').appendChild(weatherPicture);

            // document.body.appendChild(currentWeatherStatement);
          })
          .catch((error) => {
            //catch any error
            document.body.textContent = error.message; //print the error in the body
          });
      }
    })
    .catch((error) => {
      document.body.textContent = error.message;
    });
}

(clearPage) => {
  $(".cards").remove();
};

function viewHistory() {
  let history;
}
