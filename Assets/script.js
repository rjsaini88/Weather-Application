var API_key = "d7e0beaf6048af6805ba0b615e62bf01";
var input = document.querySelector("#input");
var search = document.querySelector(".searchBtn");
var timeEl = $(".date");
var imgTag = document.querySelector("#img");
var currentTime = moment().format("dddd MMMM Do [at] LT");
var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
console.log(currentTime);
timeEl.text(currentTime);
$(".1, .2,.3,.4,.5").hide();

//Click and enter event to do the search
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // displayHistory();
    createWeatherDisplay(event.target.value);
  }
});
search.addEventListener("click", function () {
  createWeatherDisplay(input.value);
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
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_key}`
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
  $(".1, .2,.3,.4,.5").hide();

  // $("").text("");

  return getGeoLocation(location) //Get location, which is Riverside, a function that retruns a promise, which is a fetch to the api geolocation
    .then((response) => response.json()) //then the response from api is parsed to JavaScript object

    .then((data) => {
      if (data.length === 0) {
        // var errorEl = document.createElement("p");
        $(".error").text(`We could not find ${location}!`);
        $(".error").show();
        setTimeout(function () {
          $(".error").hide();
        }, 3000);
        $(".1, .2,.3,.4,.5").hide();
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
            var weatherPicture = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;

            imgTag.src = weatherPicture;

            var currentWeatherStatement = `The current weather in ${location} shows ${weatherData.current.weather[0].main}, with ${weatherData.current.weather[0].description}, and temperature of ${weatherData.current.temp} degrees`;
            console.log(currentWeatherStatement);
            let weatherDecp = weatherData.current.weather[0].main;
            weatherDescription = weatherDecp.toLowerCase();
            let dF = weatherData.daily;
            $(".1, .2,.3,.4,.5").show();

            //5 Day forecast

            var day1 = {
              main: dF[1].weather[0].main,
              description: dF[1].weather[0].description,
              min: dF[1].temp.min,
              max: dF[1].temp.max,
              img: dF[1].weather[0].icon,
            };
            var day2 = {
              main: dF[2].weather[0].main,
              description: dF[2].weather[0].description,
              min: dF[2].temp.min,
              max: dF[2].temp.max,
              img: dF[2].weather[0].icon,
            };
            var day3 = {
              main: dF[3].weather[0].main,
              description: dF[3].weather[0].description,
              min: dF[3].temp.min,
              max: dF[3].temp.max,
              img: dF[3].weather[0].icon,
            };
            var day4 = {
              main: dF[4].weather[0].main,
              description: dF[4].weather[0].description,
              min: dF[4].temp.min,
              max: dF[4].temp.max,
              img: dF[4].weather[0].icon,
            };
            var day5 = {
              main: dF[5].weather[0].main,
              description: dF[5].weather[0].description,
              min: dF[5].temp.min,
              max: dF[5].temp.max,
              img: dF[5].weather[0].icon,
            };

            $(".1").html(`
            <p> Weather: ${day1.main} </p>
<p> Min: ${day1.min}</p>
<p> Max: ${day1.max}</p>
<img src= 'https://openweathermap.org/img/wn/${day1.img}@2x.png'
/> 
`);
            $(".2").html(`
            <p> Weather: ${day2.main} </p>
<p> Min: ${day2.min}</p>
<p> Max: ${day2.max}</p>
<img src= 'https://openweathermap.org/img/wn/${day2.img}@2x.png'
/> 
`);
            $(".3").html(`
            <p> Weather: ${day3.main} </p>
<p> Min: ${day3.min}</p>
<p> Max: ${day3.max}</p>
<img src= 'https://openweathermap.org/img/wn/${day3.img}@2x.png'
/> 
`);
            $(".4").html(`
            <p> Weather: ${day4.main} </p>
<p> Min: ${day4.min}</p>
<p> Max: ${day4.max}</p>
<img src= 'https://openweathermap.org/img/wn/${day4.img}@2x.png'
/> 
`);
            $(".5").html(`
            <p> Weather: ${day5.main} </p>
<p> Min: ${day5.min}</p>
<p> Max: ${day5.max}</p>
<img src= 'https://openweathermap.org/img/wn/${day5.img}@2x.png'
/> 
`);

            console.log(weatherData);
            console.log(weatherData.current.weather[0].main);
            console.log(weatherData.current.weather[0].description);
            console.log(weatherDescription);
            console.log(weatherData.current.temp);

            $(".weather").html(currentWeatherStatement);

            if (weatherDescription === "clear") { //good
              $(".currentWeather").addClass("clearSky");

            }  if (weatherDescription === "clouds") {//good
              $(".currentWeather").addClass("fewClouds");

        
            }  if (weatherDescription === "drizzle") { //good
              $(".currentWeather").addClass("showerRain");

            }  if (weatherDescription === "rain") { //good
              $(".currentWeather").addClass("rain");

            }  if (weatherDescription === "thunderstorm") {  //good
              $(".currentWeather").addClass("thunderstorm");

            }  if (weatherDescription === "snow") { //good
              $(".currentWeather").addClass("snow");

            }  if (weatherDescription === "mist") { //good
              $(".currentWeather").addClass("mist");

            }
          
          })
          //catch any erro print the error in the body
          .catch((error) => {
            document.body.textContent = error.message;
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

//weatherdata.daily[1].weather[0].description.main
