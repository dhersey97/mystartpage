function showTime(){
    let date = new Date();
    let day = date.getDay(); // returns 0 - 6
    let month = date.getMonth(); // returns 0 - 11
    let dateNumber = date.getDate(); // returns 1 - 31
    let hour = date.getHours(); // returns 0 - 23
    let minute = date.getMinutes(); // returns 0 - 59
    let second = date.getSeconds(); // returns 0 - 59
    let session = "AM";

    if(hour == 0){
        hour = 12;
    }

    if(hour > 12){
        hour = hour - 12;
        session = "PM";
    }

    minute = (minute < 10) ? "0" + minute : minute;
    second = (second < 10) ? "0" + second : second;

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
        case  1: pf = "st"; break;
        case  2: pf = "nd"; break;
        case  3: pf = "rd"; break;
        case  21: pf = "st"; break;
        case  22: pf = "nd"; break;
        case  23: pf = "rd"; break;
        case  31: pf = "st"; break;
    }
    console.log(hour, session);

    if(hour > 5 && session === "AM"){    /* 5AM - 11:59AM */
        document.getElementById("body").style.background = "linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(backgrounds/Morning.jpg) no-repeat center center fixed"; 
        document.getElementById("body").style.backgroundSize = "cover";
    }
    
    if(hour <= 8 && session === "PM"){ /* 12PM - 8PM*/
        document.getElementById("body").style.background = "linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(backgrounds/gc_day_horizontal_1.jpg) no-repeat center center fixed";
        document.getElementById("body").style.backgroundSize = "cover";
    } 
    
    else { /* NIGHTTIME */
        document.getElementById("body").style.background = "linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(backgrounds/NightCity.jpg) no-repeat bottom center fixed";
        document.getElementById("body").style.backgroundSize = "cover";
    }

    let time = hour + ":" + minute + ":" + second + " " + session;
    document.getElementById("timeDisplay").innerText = time;
    document.getElementById("timeDisplay").textContent = time;

    let today = day + ", " + month + " " + dateNumber + postfix;
    document.getElementById("dateDisplay").innerText = today;
    document.getElementById("dateDisplay").textContent = today;

    setTimeout(showTime, 1000);
}

showTime();