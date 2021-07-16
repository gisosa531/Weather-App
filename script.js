var APIKey = "e6bc155639e8522b14cb4091f92c33e5";


function getWeather(event){
    var inputEl=document.getElementById("cityInput");
    var cityName= inputEl.value;
    var apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
    console.log("helloWorld");

    fetch(apiLink).then(function(res){
        return res.json();
    }) .then(function(res){
        console.log(res);
    })
}

var submitEl=document.getElementById("submitBtn");
submitEl.addEventListener("click", getWeather);

