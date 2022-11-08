var API_key = "d7e0beaf6048af6805ba0b615e62bf01";
//This function returns a promise which is fetch to Geocoding API to grab the location. Query is location and limit is 5 to fetch only 5 location based on query
function getGeoLocation(query, limit=5){
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_key}`)
}

function getCurrentWeather(arguments){
    return fetch (`https://api.openweathermap.org/data/3.0/onecall?lat=${arguments.lat}&lon=${arguments.lon}&units=${'imperial'}&appid=${API_key}`)
}

getGeoLocation("Riverside") //Get location, which is Riverside
.then(response => response.json()) //then the response from api is parsed to JavaScript object
.then(data => {                    //then the data received can be used to 
    var{ lat, lon} = data[0]       //data is a array, setting data to index 0 to grab the first lat and lon from the array
    getCurrentWeather({lat, lon})  //function to grab current weather based on 
    .then(weatherResponse => weatherResponse.json())
    .then(weatherData =>{
        document.body.textContent = JSON.stringify(weatherData, null, 2)
    })
    .catch(error => {     //catch any error
        document.body.textContent = error.message    //print the error in the body
})
})
.catch(error => {
    document.body.textContent = error.message
})













// function getGeoLocation(query, limit = 5) {
//   return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_key}`
//   );
// }

// fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit={limit}&appid=${API_key}`)
// function getCurrentWeather(arguments) {
//   return fetch(
//     `https://api.openweathermap.org/data/3.0/onecall?lat=${arguments.lat}&lon=${arguments.lon}&units=${'imperial'}&appid=${API_key}`
//   );
// }


// getGeoLocation("Long Beach")
//   .then(function (response) {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     getCurrentWeather({ lat: data[0].lat, lon: data[0].lon })
//       .then((weatherResonse) => weatherResonse.json())
//       .then((weatherData) => {
//         document.body.textContent = JSON.stringify(weatherData, null, 2);
//       })
//       .catch((error) => {
//         document.body.textContent = error.message;
//       });
//   })
//   .catch((error) => {
//     document.body.textContent = error.message;
//   });



/*
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

*/
