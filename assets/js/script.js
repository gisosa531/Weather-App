var APIKey = "&appid=e6bc155639e8522b14cb4091f92c33e5";

var searchInfo = document.querySelector("#cityInput");
var submitEl = document.querySelector("#submitBtn");
var cityInfo = document.querySelector("citiesInfo");

var cityName = localStorage.getItem('cityNameSave');

var WeatherLink = `https://api.openweathermap.org/data/2.5/weather?q=` + cityName + '&units=imperial' + APIKey;

var ForecastLink = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + '&units=imperial' + APIKey;

function setCityInfo() {
    localStorage.setItem('cityNameSave', searchInfo.value);
}

// var 
// function getWeather(event){
//     var apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
//     console.log("hello");

//     fetch(apiLink).then(function(res){
//         return res.json();
//     }) .then(function(res){
//         console.log(res);
//     })
// }

var currentTime = moment().format("dddd, MMMM Do");
function showtTime() {
    $(".currentTime").text(currentTime);
};
showtTime();

$.ajax ({
    url: WeatherLink,
    method: "GET"
})
    .then(function(res) {

        $('.place').html("<h2>" + res.name + "</h2>");
        $('.image').html("<img src='https://openweathermap.org/img/w/" + res.weather[0].icon + ".png' >");
        $('.humidity').text("Humidity: " + res.main.humidity + "%");
        $(".temperature").text("Temperature: " + res.main.temp + " F");
        $('.wind').text("Wind Speed: " + res.wind.speed + " MPH");

        var lat = res.coord.lat;
        var lon = res.coord.lon;
        var uvIndexLink = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + APIKey;

        
        $.ajax ({
            url: uvIndexLink,
            method: "GET"
        })
            .then(function(res) {
                var uvData = res.value

                $('.uv').text("UV Index: " + res.value);
            });

    });

submitEl.addEventListener("click", setCityInfo);