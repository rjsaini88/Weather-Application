var API_key = "d7e0beaf6048af6805ba0b615e62bf01";
var input = document.querySelector("#input");
var search = document.querySelector(".searchBtn");
var timeEl = $(".date");
var imgTag = document.querySelector("#img");
var currentTime = moment().format("dddd MMMM Do [at] LT");
var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
console.log(currentTime);
timeEl.text(currentTime);

//Click and enter event to do the search
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // displayHistory();
    createWeatherDisplay(event.target.value);
  }
});
search.addEventListener("click", function () {
  createWeatherDisplay(input.value);
  // displayHistory();
});

displayHistory();
//function to display search history
function displayHistory() {
  //clear old history
  $(".history").text("");
  console.log(searchHistory); //var searchHistory declared globally, to parse info for localStorage and set to searchHistory
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
    });

    $(".history").append(historybtn);
  }
}
//function to add to localStorage if localStorage contains the value of the searched location, do not add.
function addToHistory(location) {
  for (var i = 0; i < searchHistory.length; i++) {
    if (searchHistory[i] === location) {
      return;
    }
  }
  searchHistory.push(location);
  localStorage.setItem("history", JSON.stringify(searchHistory));
}

//This function returns a promise which is fetch to Geocoding API to grab the location. Query is location and limit is 5 to fetch only 5 location based on query
function getGeoLocation(query, limit = 5) {
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
function createWeatherDisplay(location) {
  $(".currentWeather").removeClass(
    "clearSky clouds fewClouds mist snow scatteredClouds brokenClouds showerRain rain thunderstorm"
  );

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
        
      } else {
        addToHistory(location);
        displayHistory();
        // var { lat, lon } = data[0]; //data is a array, setting data to index 0 to grab the first lat and lon from the results of getGeoLocation ("Riversive") funciton.
        // console.log(data[0].lat)
        console.log(data);

        //then the data received can be used to
        getCurrentWeather({ lat: data[0].lat, lon: data[0].lon }) //the argument lat and lon with data [0] passed into the getCurrentWeather function.
          //getCurrentWeather({ lat, lon }) //function to grab current weather based on lat and the lon we determined
          .then((weatherResponse) => weatherResponse.json()) //parse the response received from getCurrentWeather  the wriiten function same as writing .then (function(weatherResponse){weatehrResonse.json()})

          .then((weatherData) => {
            var weatherPicture = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;

            imgTag.src = weatherPicture;

            var currentWeatherStatement = `The current weather in ${location} shows ${weatherData.current.weather[0].main}, with ${weatherData.current.weather[0].description}, and temperature of ${weatherData.current.temp} degrees`;
            console.log(currentWeatherStatement);
            let weatherDescription = weatherData.current.weather[0].description;
            let dailyForecast = weatherData.daily;
            console.log(dailyForecast)

// 5 Day forecast
// dailyForecast
// for the future forcast
// for (vari=1;i<6;i++){
var day = {
  main: weatherData.daily[1].weather[0].main,
  description: weatherData.daily[1].weather[0].description,
  icon: weatherData.daily[1].weather[0].icon,
} 
console.log(day)
// dailyForecast.foreach(weather[0].main =>{

// }
//   ) 









            console.log(weatherData);
            console.log(weatherData.current.weather[0].main);
            console.log(weatherData.current.weather[0].description);
            console.log(weatherDescription);
            console.log(weatherData.current.temp);

            $(".weather").html(currentWeatherStatement);

            // $(".currentWeather").removeClass("clearSky fewClouds mist snow scatteredClouds brokenClouds showerRain rain thunderstorm" );

            if (weatherDescription === "clear sky") {
              $(".currentWeather").addClass("clearSky");
            }

            if (weatherDescription === "few clouds") {
              $(".currentWeather").addClass("fewClouds");
            }
            if (weatherDescription === "scattered clouds") {
              $(".currentWeather").addClass("scatteredClouds");
            }
            if (weatherDescription === "broken clouds") {
              $(".currentWeather").addClass("brokenClouds");
            }
            if (weatherDescription === "shower rain") {
              $(".currentWeather").addClass("showerRain");
            }
            if (weatherDescription === "rain") {
              $(".currentWeather").addClass("rain");
            }
            if (weatherDescription === "thunderstorm") {
              $(".currentWeather").addClass("thunderstorm");
            }
            if (weatherDescription === "snow") {
              $(".currentWeather").addClass("snow");
            }
            if (weatherDescription === "mist") {
              $(".currentWeather").addClass("mist");
            }
            if (weatherDescription === "overcast clouds") {
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

// var currentWeatherStatement = `The current weather in ${location} shows ${weatherData.current.weather[0].main}, with ${weatherData.current.weather[0].description}, and temperature of ${weatherData.current.temp} degrees`;

/* Put this after the weather data

}




  var userClicked = {
      drinkName: drinkName,
      drinkId: drinkId,
      picture: drinkImg,
    };
*/

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

//weatherdata.daily[1].weather[0].description.main