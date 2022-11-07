var API_key = "d7e0beaf6048af6805ba0b615e62bf01";
function getGeoLocation(query, limit = 5) {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_key}`
  );
}

getCurrentWeather = ([lat, lon, units]) => {
  return fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${API_key}`
  );
};

getGeoLocation('Long Beach')
.then(function(response) {
return response.json()
})
.then(data => {
    getCurrentWeather({lat: data[0].lat, long: data[0].lon})
    .then(weatherResonse => weatherResonse.json())
    .then(weatherResonse => {
        document.body.textContent = JSON.stringify(weatherData, null, 2)
    })
.catch(error => {
    document.body.textContent = error.message
})
    })
    .catch(error => {
        document.body.textContent = error.message
    })


// getGeoLocation("Long Beach")
//   .then(response => response.json())
//   .then(data => {
//     var {lat, lon} = data [0]
//     console.log(data)
//     getCurrentWeather({lat, lon})
//     .then(weatherResonse => weatherResonse.json())
//     .then(weatherData => {

//         document.body.textContent = JSON.stringify(weatherData, null, 2);
//     })
//     .catch (error =>{
//         document.body.textContent = error.message
//   })
// })
//   .catch(error => {
//     document.body.textContent = error.message;
//   })
  