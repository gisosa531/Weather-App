//variabled
var APIKey = "&appid=e6bc155639e8522b14cb4091f92c33e5";

var searchInfo = document.querySelector("#cityInput");
var submitEl = document.querySelector("#submitBtn");
var cityInfo = document.querySelector("citiesInfo");


// Info stored
function setCityInfo() {
   var getInfo = JSON.parse(localStorage.getItem("cityNameSave")) || [];
    getInfo.push(searchInfo.value)
    localStorage.setItem('cityNameSave', JSON.stringify(getInfo));
    console.log(getInfo);
    $("#citiesInfo").html("");
    for (var i = 0; i < getInfo.length; i++) {
        $("#citiesInfo").append("<button onclick = 'runWeatherAPI(event)'>" + getInfo[i] + "</button>");
    
    }
}


//Time Displayed
var currentTime = moment().format("dddd, MMMM Do");

function showtTime() {
    $(".currentTime").text(currentTime);
};
showtTime();

function runWeatherAPI(event) {
    var cityName = $("#cityInput").val();
    console.log(cityName);
    if(!event.target.textContent){
        console.log(event.target.textContent);
        setCityInfo();
        cityName = event.target.textContent;
    }
    var WeatherLink = `https://api.openweathermap.org/data/2.5/weather?q=` + cityName + '&units=imperial' + APIKey;
    var ForecastLink = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + '&units=imperial' + APIKey;

    $.ajax ({
        url: WeatherLink,
        method: "GET"
    })
        .then(function(res) {
    
            $('.place').html("<h3>" + res.name + "</h3>");
            $('.image').html("<img src='https://openweathermap.org/img/w/" + res.weather[0].icon + ".png' >");
            $('.humid').text("Humidity: " + res.main.humidity + "%");
            $(".temp").text("Temperature: " + res.main.temp + " F");
            $('.wind').text("Wind Speed: " + res.wind.speed + " MPH");
    
            var lat = res.coord.lat;
            var lon = res.coord.lon;
            var uvIndexLink = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + APIKey;
    
            //Uv index 
            $.ajax ({
                url: uvIndexLink,
                method: "GET"
            }) .then(function(res) {
                    var uvData = res.value
    
                    $('.uv').css("background-color", uvDisplay(uvData));
                    $('.uv').text("UV Index: " + res.value);
                });
    
        });
    
        function uvDisplay (uvData, uvColor) {
            var uvColor = "";
            if (uvData <= 2) {
                uvColor = "#00b300";
            }
            else if (uvData <= 5 && uvData > 2) {
                uvColor = "#ffac1c";
            }
            else if (uvData > 5) {
                uvColor = "#ff2400";
            }
            return uvColor;
        }
        
    
        //Five day Forecast
        $.ajax ({
            url: ForecastLink,
            method: "GET"
        }) .then(function (res) {
        
                var firstDay = moment(res.list[0].dt_txt).format("dddd, MMM Do");
        
                $(".timeOne").html("<h5>" + firstDay + "</h5>");
                $(".imageOne").html("<img src='https://openweathermap.org/img/w/" + res.list[0].weather[0].icon + ".png' alt='Weather Conditions Icon.'>");
                $(".humidOne").text("Humidity: " + res.list[0].main.humidity + "%");
                $(".tempOne").text("Temp: " + res.list[0].main.temp + " F");
    
                var dayTwo = moment(res.list[8].dt_txt).format("dddd, MMM Do");
    
                $(".timeTwo").html("<h5>" + dayTwo + "</h5>");
                $(".imageTwo").html("<img src='https://openweathermap.org/img/w/" + res.list[8].weather[0].icon + ".png' alt='Weather Conditions Iconr.'>");
                $(".tempTwo").text("Temp: " + res.list[8].main.temp + " F");
                $(".humidTwo").text("Humidity: " + res.list[8].main.humidity + "%");
    
                var dayThree = moment(res.list[16].dt_txt).format("dddd, MMM Do");
    
                $(".timeThree").html("<h5>" + dayThree + "</h5>");
                $(".imageThree").html("<img src='https://openweathermap.org/img/w/" + res.list[16].weather[0].icon + ".png' alt='Weather Conditions Icon.'>");
                $(".tempThree").text("Temp: " + res.list[16].main.temp + " F");
                $(".humidThree").text("Humidity: " + res.list[16].main.humidity + "%");
    
                var dayFour = moment(res.list[24].dt_txt).format("dddd, MMM Do");
        
                $(".timeFour").html("<h5>" + dayFour + "</h5>");
                $(".imageFour").html("<img src='https://openweathermap.org/img/w/" + res.list[24].weather[0].icon + ".png' alt='Weather Conditions Icon.'>");
                $(".tempFour").text("Temp: " + res.list[24].main.temp + " F");
                $(".humidFour").text("Humidity: " + res.list[24].main.humidity + "%");
    
                var dayFive = moment(res.list[32].dt_txt).format("dddd, MMM Do");
        
                $(".timeFive").html("<h5>" + dayFive + "</h5>");
                $(".imageFive").html("<img src='https://openweathermap.org/img/w/" + res.list[32].weather[0].icon + ".png' alt='Weather Conditions Icon.'>");
                $(".tempFive").text("Temp: " + res.list[32].main.temp + " F");
                $(".humidFive").text("Humidity: " + res.list[32].main.humidity + "%");
            });
        
}



// Current Weather


submitEl.addEventListener("click", runWeatherAPI);