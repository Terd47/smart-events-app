var openWeatherKey = "7f0107959f91d24fd331487876d42456";
var openWeatherurl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=" + openWeatherKey;

var calendarificKey = "	f51769744b4472595fff806872c68a32095c4dc4";
var calendarificurl = "https://calendarific.com/api/v2/holidays?api_key=" + calendarificKey;

var ticketmasterKey = "KiAinN6vNRl0b9VY44tRzV4fBlEOdB5C";
var ticketmasterurl = "https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=" + ticketmasterKey;

var nyTimesKey = "f5Ql8CE6k7NqGhfkbESevpi2pGC8dDq3";
var nyTimesurl = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + nyTimesKey;


// Weekly Planner

// Checking local storage for previously saved events 
function checkSaved() {
    for (var i = 0; i < localStorage.length; i++){

            for (var e = 0; e < $(".plannerHeader").length; e++){
                //   Sets text on match
                if (localStorage.key(i) == $(".plannerHeader").eq(e).text()){
                    console.log("matched");
                    var lis = localStorage.getItem(localStorage.key(i));
                    console.log(lis);
                // Creates lis with content from storage
                    var newLi = $("<li>");
                    newLi.text(lis);
                    $(".plannerUL").eq(e).append(newLi);
                    
                } else {
                    console.log("failed");
                    
                }
            }
    }
}

function saveContent() {    
    // Save to local under the key of the date for each date
    for (var i =0; i < $(".plannerHeader").length; i++) {
        var lis = $(".plannerUL").eq(i).children("li").html();
        if (lis === undefined) {
            
        } else {
            localStorage.setItem($(".plannerHeader").eq(i).text(), lis);
        }
        
        
    }
}

function clearSchedule(){
    $(".plannerUL").empty();
    localStorage.clear();
}

function GetDates(startDate, daysToAdd) {
    var aryDates = [];

    for (var i = 0; i <= daysToAdd; i++) {
        var currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear());
    }

    return aryDates;
}
function MonthAsString(monthIndex) {
    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return month[monthIndex];
}
function DayAsString(dayIndex) {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    return weekdays[dayIndex];
}

function labelPlanner () {
    
    // Generating Dates for the week starting with today
    for (var i = 0; i < $(".plannerTile").length; i++) {
        var startDate = new Date();
        var aryDates = GetDates(startDate, 7);
    
        var p = $("<p>");
        p.text(aryDates[i]);
        p.addClass(".date");
        $(".plannerHeader").eq(i).prepend(p);

    }
    


}

labelPlanner();
checkSaved();

// Adds User Event 
$('input:submit').on("click", function(event){
    event.preventDefault();
    // Gets data from sibling input and select
    var userEvent = $(this).siblings().eq(1).val();
    var userTime = $(this).siblings().eq(2).find('option:selected').text();

    // Creates li element
    var li = $("<li>");
    li.text(userTime + " - " + userEvent);
    li.attr("data-value", userTime);
    $(this).siblings().eq(0).append(li);

    saveContent();
});

$("#clearSch").on("click", clearSchedule);