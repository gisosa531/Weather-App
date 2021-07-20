var APIKey = "&appid=e6bc155639e8522b14cb4091f92c33e5";

var searchInfo = document.querySelector("#cityInput");
var submitEl = document.querySelector("#submitBtn");
var cityInfo = document.querySelector("citiesInfo");

var cityName = localStorage.getItem('cityNameSave');

var WeatherLink = `https://api.openweathermap.org/data/2.5/weather?q=` + cityName + '&units=imperial' + APIKey;

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


submitEl.addEventListener("click", setCityInfo);