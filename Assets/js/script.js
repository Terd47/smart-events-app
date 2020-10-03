var calendarificKey = "	f51769744b4472595fff806872c68a32095c4dc4";
var calendarificurl = "https://calendarific.com/api/v2/holidays?api_key=" + calendarificKey;

<<<<<<< HEAD
var nyTimesKey = "f5Ql8CE6k7NqGhfkbESevpi2pGC8dDq3";
var nyTimesurl = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + nyTimesKey;

// ticket master ajax call
var displayEvent = $('#get-events');

function getLocation(){
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(function(position){
            $('#yourLocation').html("")
        })
    }
}

var ticketmasterKey = "KiAinN6vNRl0b9VY44tRzV4fBlEOdB5C";
var eventDiv = `<div class="columns is-mobile">
                    <div id="attractions"></div>
                    <div id="events">
                    </div>
                    <div id="entertain"></div>
                    <div id="sports"></div>
                </div>`;

function localAttractions(){

    
    var ticketmasterurl = "https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=" + ticketmasterKey;
    $.ajax({
        url: ticketmasterurl,
        method: "GET"
      }).then(function(response){
         $('#get-events').append(eventDiv);
          console.log(response);
          console.log(response._embedded.attractions[0].name);
          var attract1 = response._embedded.attractions.length;
        // $('#events').text(JSON.stringify(response._embedded.classifications[16].segment.name));

           for(var i = 0; i < attract1; i++) {
               var placeName = $('<p>');
               placeName.text(response._embedded.attractions[i].name);
               $('#attractions').append(placeName);
               console.log(attract1);
           }
        
        });
    
          
        //  $('#events').text(response.events);
                    

      
}

function getEvents(){
    var eventUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + ticketmasterKey;
    $.ajax({
        url: eventUrl,
        method: "GET"
      }).then(function(events){
        var event1 = events._embedded.events.length;
        
         console.log(events);
         for(var i = 0; i < event1; i++) {
            var eventName = $('<p>');
            var eventInfo = $('<p>');
            var eventUrl = $('<p>');
            eventName.text(events._embedded.events[i].name);
            eventInfo.text(events._embedded.events[i].info);
            eventUrl.text(events._embedded.events[i].url);

            $('#events').append(eventName);
            $('#events').append(eventInfo);
            $('#events').append(eventUrl);
            console.log(events._embedded.events[0].name);
            console.log(events._embedded.events[0].info);
            console.log(events._embedded.events[0].url);
        }


      });


}
getEvents();


$('#attractionEvents').on('click', function(){
    localAttractions();
});

$('#justEvents').on('click', function(){
    getEvents();
})
=======
var ticketmasterKey = "KiAinN6vNRl0b9VY44tRzV4fBlEOdB5C";
var ticketmasterurl = "https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=" + ticketmasterKey;

var nyTimesKey = "f5Ql8CE6k7NqGhfkbESevpi2pGC8dDq3";
// ------------------------------------tabs-for-news-----------------------------------------------------------------------
$(".is-active").on("click", function(){
    var section = $(this).text().trim();
    
     var nyTimesUrl = "https://api.nytimes.com/svc/topstories/v2/" + section + ".json?api-key=" + nyTimesKey;

     $.ajax({
         url: nyTimesUrl,
         method: 'GET'
     }).then(function (response) {
             console.log(response);
         

             $(".is-active").on("click", function () {
                 $('#topStories').empty();
                 for (var i = 0; i < response.results.length; i += 11) {
                     var link = $("<a>");
                     link.attr('href', (response.results[i].short_url));
                     link.text(response.results[i].title);
                     link.append($("<li>"));
                     $("#topStories").append(link);
                 }
             });

         });

         //-------------------------------------search for news-------------------------------------------
         var searchId = $("#search");
         var searchTxt = "";
         var searchBtn = $("#searchBtn");
     
         
         searchBtn.click(function () {
             event.preventDefault();
             searchTxt = searchId.val().trim();
             console.log(searchTxt);
     
             var nytSearckKey = "ZAYcM5GbhkBjdLu6GGSpxwqrYypoxmoG";
             var nytSearchUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTxt +"&api-key=" + nytSearckKey;
             console.log(nytSearchUrl + "--SURL--");
     
             
             $.ajax({
                 url: nytSearchUrl,
                 method: "GET"
             }).then(function (results) {
                 console.log(results , "R");
     
     
                 var searchRes = results.response.docs;
                 $("#topStories").empty();
                 for (var i = 0; i < searchRes.length; i += -1) {
                     var searchLink = $("<a>");
                     searchLink.attr('href', (searchRes[i].web_url));
                     searchLink.text(searchRes[i].headline.main);;
                     searchLink.append($("<li>"));
                     $("#topStories").append(searchLink);
                 console.log(searchLink, "p");


// Weather
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
        var p = $("<p>");
        p.text("Geolocation is not supported by this browser.");
        $(".weatherOverview").append(p);
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(lat + ", " + lon);
    var openWeatherKey = "7f0107959f91d24fd331487876d42456";
    var openWeatherurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + openWeatherKey;

    $.ajax({
        url: openWeatherurl
    }).then(function(response){
        console.log(response);
        // Description Section
        var desDiv = $("<div>");
        desDiv.addClass("tile is-child weatherTile");
        var desH = $("<h3>");
        desH.text("Overview");
        desDiv.append(desH);
        // Icon
        var img = $("<img>");
        img.attr("src", "Assets/images/"+response.current.weather[0].icon+".png");
        desDiv.append(img);

        var descriptionTxt = $("<p>");
        descriptionTxt.text(response.current.weather[0].description);
        desDiv.append(descriptionTxt);
        // Appending div
        $(".weatherOverview").append(desDiv);


        // Temperature Section
        var tempDiv = $("<div>");
        tempDiv.addClass("tile is-child weatherTile");
        var tempH = $("<h4>");
        tempH.text("Temperature");
        tempDiv.append(tempH);

        // Farenheit
        var F = response.current.temp;
                F = F.toFixed(1);
                var faren = $("<p>");
                faren.text(F + " ° F");
        tempDiv.append(faren);
        // Celcius
        var C = (response.current.temp - 32) * 5/9;
                C = C.toFixed(1);
                var celc = $("<p>");
                celc.text(C + " ° C");
        tempDiv.append(celc);
        // Appending div
        $(".weatherOverview").append(tempDiv);

        // Wind Section
        var windDiv = $("<div>");
        windDiv.addClass("tile is-child weatherTile");
        var windH = $("<h4>");
        windH.text("Wind");
        windDiv.append(windH);
        
        var windSpeed = $("<p>");
        windSpeed.text("Wind Speed: " + response.current.wind_speed + " MPH");
        windDiv.append(windSpeed);

        var windDeg = $("<p>");
        var deg = response.current.wind_deg;
        if (deg > 330.1 && deg < 30.1) {
            windDeg.text("Direction: N");
        } else if (deg > 30.1 && deg < 60.1) {
            windDeg.text("Direction: NE");
        } else if (deg > 60.1 && deg < 120.1) {
            windDeg.text("Direction: E");
        } else if (deg > 120.1 && deg < 150.1) {
            windDeg.text("Direction: SE");
        } else if (deg > 150.1 && deg < 210.1) {
            windDeg.text("Direction: S");
        } else if (deg > 210.1 && deg < 240.1) {
            windDeg.text("Direction: SW");
        } else if (deg > 240.1 && deg < 300.1) {
            windDeg.text("Direction: W");
        } else if (deg > 300.1 && deg < 330.1) {
            windDeg.text("Direction: NW");
        }
        windDiv.append(windDeg);
        // Appending div
        $(".weatherOverview").append(windDiv);
    });
}

getLocation();

// Weekly Planner

// Checking local storage for previously saved events 
function checkSaved() {
    for (var i = 0; i < localStorage.length; i++){

            for (var e = 0; e < $(".plannerHeader").length; e++){
                //   Sets text on match
                if (localStorage.key(i) == $(".plannerHeader").eq(e).text()){
                    var lis = localStorage.getItem(localStorage.key(i));
                // Creates lis with content from storage
                    $(".plannerUL").eq(e).append(lis);
                    
                } else {
                    console.log("localstorage failed");
                    
                }
            }
    }
}

function saveContent() {    
    // Save to local under the key of the date for each date
    for (var i =0; i < $(".plannerHeader").length; i++) {
        var lis = $(".plannerUL").eq(i).html();
        // Checks to ensure it only saves content
        if (lis === undefined) {
            
        } else if (lis === "") {
            
        } else {
            localStorage.setItem($(".plannerHeader").eq(i).text(), lis);
        }
        
        
    }
}

function sortContent() {
    Array.prototype.slice.call(document.querySelectorAll('.plannerUL li')).sort(function(a, b) {
        console.log("A: ");
        console.log(a);
        console.log("B: ");
        console.log(b);
        return a.getAttribute('data-position').localeCompare(b.getAttribute('data-position'));
      }).forEach(function(currValue) {
        currValue.parentNode.appendChild(currValue);
      });
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
    var dataval = $(this).siblings().eq(2).find('option:selected').attr("data-position");
    

    // Creates li element
    var li = $("<li>");
    li.text(userTime + " - " + userEvent);
    li.attr("data-position", dataval);
    $(this).siblings().eq(0).append(li);
    sortContent();
    saveContent();

    
});

$("#clearSch").on("click", clearSchedule);
<<<<<<< HEAD

=======
});
>>>>>>> 9da318b5ab9034da6a9912b7ba14dcd5a52612b2
>>>>>>> af756d78651306e0b2a1981da257abd305db57ee
