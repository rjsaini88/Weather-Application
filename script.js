/* Questions






5 day history loop over data.
cookies
*/

var input = document.querySelector("#input");
var search = document.querySelector(".searchBtn");
var timeEl = $(".date");
var imgTag = document.querySelector("#img");
var currentTime = moment().format("dddd MMMM Do [at] LT");
var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
console.log(currentTime);
timeEl.text(currentTime);
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // location.reload();
    // document.body.innerHTML=''
    // clearPage(); //this needs corredction.
    createWeatherDisplay(event.target.value);
    // addToHistory(event.target.value);
    addToHistory(event.target.value);
    displayHistory();
  }
});

search.addEventListener("click", function () {
  createWeatherDisplay(input.value);
  addToHistory(input.value);
  displayHistory();
});

displayHistory();
// $('.seach').on ('click', createWeatherDisplay);  <-----> click event listener!!!

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
function displayHistory() {
  //clear old history
  $(".history").text("");
  console.log(searchHistory);
  for (var i = 0; i < searchHistory.length; i++) {
    var historybtn = document.createElement("button");
    // historybtn.setAttribute;  ---------- check this
    var historyItem = searchHistory[i];
    console.log(searchHistory[i]);
    console.log(historyItem);
    console.log(historybtn);
    historybtn.textContent = historyItem;
    historybtn.addEventListener("click", function (event) {
      createWeatherDisplay(event.target.textContent);
      // if(searchHistory)
    });

    // historybtn.append('.historybtn');
    // $('historybtn').append('.history');
    // document.body.appendChild(historybtn);
    // $('.history').html(currentWeatherStatement)
    // $('#img').append(image)
    $(".history").append(historybtn);
  }
}
function addToHistory(location) {
  // var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
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
    if (searchHistory[i] === location) {
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

// $(".error").hide();

function createWeatherDisplay(location) {
  $(".currentWeather").removeClass(
    "clearSky fewClouds mist snow scatteredClouds brokenClouds showerRain rain thunderstorm"
  );

  // document.body.innerHTML = ''
  // clearPage()
  // addToHistory(location);
  //create function to remove inner HTML ---->
  return getGeoLocation(location) //Get location, which is Riverside, a function that retruns a promise, which is a fetch to the api geolocation
    .then((response) => response.json()) //then the response from api is parsed to JavaScript object

    .then((data) => {
      if (data.length === 0) {
        // var errorEl = document.createElement("p");
        $(".error").text(`We could not find ${location}`);
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

            imgTag.src = weatherPicture;
            // var currentWeatherStatement = document.createElement("p");
            var currentWeatherStatement = `The current weather in ${location} is ${weatherData.current.weather[0].main}, with ${weatherData.current.weather[0].description}, and temperature of ${weatherData.current.temp} degrees`;
            console.log(currentWeatherStatement);
            let weatherDescription = weatherData.current.weather[0].description;

            // document.body.textContent = JSON.stringify(weatherData, null, 2);  //stringfy data and print the data to screen.
            console.log(weatherData);
            console.log(weatherData.current.weather[0].main);
            console.log(weatherData.current.weather[0].description);
            console.log(weatherDescription);
            console.log(weatherData.current.temp);

            // displayHistory();
            $(".weather").html(currentWeatherStatement);

            // $(".currentWeather").removeClass("clearSky fewClouds mist snow scatteredClouds brokenClouds showerRain rain thunderstorm" );

            if (weatherDescription === "clear sky") {
              $(".currentWeather").addClass("clearSky");
            }

            if (weatherDescription === "few clouds") {
              // $(".currentWeather").removeClass();
              $(".currentWeather").addClass("fewClouds");
            }
            if (weatherDescription === "scattered clouds") {
              // $(".weather").removeClass();
              $(".currentWeather").addClass("scatteredClouds");
            }
            if (weatherDescription === "broken clouds") {
              // $(".weather").removeClass();
              $(".currentWeather").addClass("brokenClouds");
            }
            if (weatherDescription === "shower rain") {
              // $(".weather").removeClass();
              $(".currentWeather").addClass("showerRain");
            }
            if (weatherDescription === "rain") {
              // $(".weather").removeClass();
              $(".currentWeather").addClass("rain");
            }
            if (weatherDescription === "thunderstorm") {
              // $(".weather").removeClass();
              $(".currentWeather").addClass("thunderstorm");
            }
            if (weatherDescription === "snow") {
              // $(".weather").removeClass();
              $(".currentWeather").addClass("snow");
            }
            if (weatherDescription === "mist") {
              // $(".weather").removeClass();
              $(".currentWeather").addClass("mist");
            }
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

// change jumbrotron background <----------->
// let backgroundImageUrl = [
//   "./Images/clear-sky.gif, /Images/few-clouds.gif, /Images/scattered-clouds.gif, /Images/clouds.gif, /Images/shower-rain.gif, /Images/rain.gif, /Images/thunder.gif, /Images/snow.gif, /Images/mist.gif "
// ];
// let jumbo = $('.jumbotron')
// function changeBackground (){
// var
// }
// let changeBackground = function (){
//  change = setInterval()
// }
