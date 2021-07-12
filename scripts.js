function showTime(){
    let date = new Date();
    let day = date.getDay(); // returns 0 - 6
    let month = date.getMonth(); // returns 0 - 11
    let dateNumber = date.getDate(); // returns 1 - 31
    let hour = date.getHours(); // returns 0 - 23
    let rawHour = hour; //Military Time
    let minute = date.getMinutes(); // returns 0 - 59
    let second = date.getSeconds(); // returns 0 - 59
    let session = "AM";

    if(hour === 12){
        session = "PM";
    }

    if(hour === 0){
        hour = 12;
        session = "AM";
    }

    if(hour > 12){
        hour = hour - 12;
        session = "PM";
    }

    minute = (minute < 10) ? "0" + minute : minute;
    second = (second < 10) ? "0" + second : second;

    formatDate(day, month, dateNumber);
    setBackground(rawHour);
    formatTime(hour, minute, second, session);

    setTimeout(showTime, 1000);
}

function formatTime(hour, minute, second, session){
    let time = hour + ":" + minute + ":" + second + " " + session;
    document.getElementById("timeDisplay").innerText = time;
    document.getElementById("timeDisplay").textContent = time;
}

function setBackground(hour){
    let timeOfDay = "";

    if(hour < 5){timeOfDay = "night"}
    if(hour >= 5 && hour < 12){timeOfDay = "morning"}
    if(hour >= 12 && hour < 20){timeOfDay = "day"}
    if(hour >= 20){timeOfDay = "night"} 

    switch(timeOfDay){
        case "morning":{
            document.getElementById("body").style.background = "linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(backgrounds/Morning.jpg) no-repeat center center fixed"; 
            document.getElementById("body").style.backgroundSize = "cover";
            break;
        }
        case "day":{
            document.getElementById("body").style.background = "linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(backgrounds/gc_day_horizontal_1.jpg) no-repeat center center fixed";
            document.getElementById("body").style.backgroundSize = "cover";
            break;
        }
        case "night":{
            document.getElementById("body").style.background = "linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(backgrounds/NightCity.jpg) no-repeat bottom center fixed";
            document.getElementById("body").style.backgroundSize = "cover";
            break;
        }
    }
}

function formatDate(day, month, dateNumber){
    switch(day) {
        case 0: day = "Sunday"; break;
        case 1: day = "Monday"; break;
        case 2: day = "Tuesday"; break;
        case 3: day = "Wednesday"; break;
        case 4: day = "Thursday"; break;
        case 5: day = "Friday"; break;
        case 6: day = "Saturday"; break;
    }

    switch(month){
        case 0: month = "January"; break;
        case 1: month = "February"; break;
        case 2: month = "March"; break;
        case 3: month = "April"; break;
        case 4: month = "May"; break;
        case 5: month = "June"; break;
        case 6: month = "July"; break;
        case 7: month = "August"; break;
        case 8: month = "September"; break;
        case 9: month = "October"; break;
        case 10: month = "November"; break;
        case 11: month = "December"; break;
    }

    let postfix = "th";
    switch(dateNumber){
        case  1: postfix = "st"; break;
        case  2: postfix = "nd"; break;
        case  3: postfix = "rd"; break;
        case  21: postfix = "st"; break;
        case  22: postfix = "nd"; break;
        case  23: postfix = "rd"; break;
        case  31: postfix = "st"; break;
    }

    let today = day + ", " + month + " " + dateNumber + postfix;
    document.getElementById("dateDisplay").innerText = today;
    document.getElementById("dateDisplay").textContent = today;
}

// Uses openweathermap API to get current weather for Merrimac MA
function getWeather(){
    const APIkey = '042dddf3fcb6c45c88287e33ed68f139';
    const city = 'merrimac';
    const hardCode = 'api.openweathermap.org/data/2.5/weather?q=merrimac&appid=042dddf3fcb6c45c88287e33ed68f139';

    const weatherData = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let tempKelvin = data.main.temp;
            let temp = kelvinToFahrenheit(tempKelvin);
            document.getElementById("temp").innerText = temp + "º";

            let weatherName = data.weather[0].main;
            let weatherID = data.weather[0].id;
            let weatherDesc = data.weather[0].description;
            selectWeatherIcon(weatherID, weatherName); 
        });

}

function kelvinToFahrenheit(tempK){
    return Math.round((tempK - 273.15) * (9/5) + 32);
}

function selectWeatherIcon(id, name){
    switch(name){
        case('Thunderstorm'):{
            document.getElementById("weatherIcon").src = "http://openweathermap.org/img/wn/11d@2x.png";
            break;
        }
        case('Drizzle'):{
            document.getElementById("weatherIcon").src = "http://openweathermap.org/img/wn/09d@2x.png";
            break;
        }
        case('Rain'):{
            if(id < 511){document.getElementById("weatherIcon").src = "http://openweathermap.org/img/wn/10d@2x.png";}
            if(id === 511){document.getElementById("weatherIcon").src = "http://openweathermap.org/img/wn/13d@2x.png";}
            if(id > 511){document.getElementById("weatherIcon").src = "http://openweathermap.org/img/wn/09d@2x.png";}
            break;
        }
        case('Snow'):{
            document.getElementById("weatherIcon").src = "http://openweathermap.org/img/wn/13d@2x.png";
            break;
        }
        case('Clear'):{
            document.getElementById("weatherIcon").src = "http://openweathermap.org/img/wn/01n@2x.png";
            break;
        }
        case('Clouds'):{
            document.getElementById("weatherIcon").src = "http://openweathermap.org/img/wn/03d@2x.png";
            break;
        }
    }
}

getWeather();
showTime();