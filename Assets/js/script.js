var calendarificKey = "	f51769744b4472595fff806872c68a32095c4dc4";
var calendarificurl = "https://calendarific.com/api/v2/holidays?&country=US&year=2020&api_key=f51769744b4472595fff806872c68a32095c4dc4";


var nyTimesKey = "f5Ql8CE6k7NqGhfkbESevpi2pGC8dDq3";
var nyTimesurl = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + nyTimesKey;

$(document).ready(function(){
// Setting Weather Background
var d = new Date(); // for now
d.getHours(); 
d.getMinutes(); 
d.getSeconds(); 
if (d.getHours() < 10) {
    console.log('morning');
    var imageURL = 'https://media.istockphoto.com/photos/sunrise-over-field-picture-id825148240?k=6&m=825148240&s=612x612&w=0&h=Sdy9V-w5Na5LGYzGudgJYA73U5xjpKDt6OpgGt2ZkRU=';
    $(".weatherSection").css('background-image', 'url(' + imageURL + ')');
    $(".weatherSection").css('color', 'black');
} else if (d.getHours() < 18) {
    console.log('afternoon');
    var imageURL = 'https://images.unsplash.com/photo-1536532184021-da5392b55da1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9';
    $(".weatherSection").css('background-image', 'url(' + imageURL + ')');
    $(".weatherSection").css('color', 'white');
} else {
    console.log('night');
    var imageURL = 'https://www.createwebquest.com/sites/default/files/images/114484979.jpg';
    $(".weatherSection").css('background-image', 'url(' + imageURL + ')');
    $(".weatherSection").css('color', 'white');
}

//holiday---------------------------------------------------------------------------------------------------
var dateObj = new Date();
var day = dateObj.getUTCDate();
var month = dateObj.getUTCMonth() + 1;

var calendarificKey = "	f51769744b4472595fff806872c68a32095c4dc4";
var calendarificurl = "https://calendarific.com/api/v2/holidays?&country=US&year=2020"  + "&month=" + month + "&api_key=f51769744b4472595fff806872c68a32095c4dc4";


$.ajax({
    url: calendarificurl,
    method: 'GET'
}).then(function (response) {
        

        var holiday = response.response.holidays;
        for(var i =0; i<7; i++){
            for(var x = 0; x<holiday.length; x++){
                
          if  ($(".date").eq(i).data("date") === holiday[x].date.iso){
              var holList = $("<li>");
              var icon = $("<i>");
              icon.addClass("fas fa-times");
              icon.on('click', function(){
                $(this).parent().remove();
              });

              holList.text(holiday[x].name);
              holList.prepend(icon);
              $(".plannerUL").eq(i).append(holList);
          } 

         
        }}
        checkSaved();
});



// ticket master ajax call
var displayEvent = $('#get-events');


var ticketmasterKey = "KiAinN6vNRl0b9VY44tRzV4fBlEOdB5C";
var eventDiv = `<div class="columns is-mobile">
                    <div id="events">
                    </div>
                </div>`;

function getEvents(){
    var eventUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + ticketmasterKey;
    $.ajax({
        url: eventUrl,
        method: "GET"
      }).then(function(events){
        var event1 = events._embedded.events.length;
        $('#event-div').html(eventDiv)
        
         console.log(events);

         for(var i = 0; i < event1; i++) {

            var eventName = $('<p class"title">');
            var eventUrl = $('<a target="_blanck" >');

            var eventDate = events._embedded.events[i].dates.start.localDate;
            var eventImage = $('<img>')
            eventImage.addClass('is-square');
            var figure = $('<figure>');
            figure.addClass('image is-128x128');
            eventName.attr("data-date", eventDate);
            eventUrl.attr('href', events._embedded.events[i].url);
            eventImage.attr('src', events._embedded.events[i].images[2].url);


            eventName.on('click', function(){
            
                for (var i = 0; i < 7; i++) {
                    
                    if ($(".date").eq(i).data('date') == $(this).data('date')) {
                        
                        console.log($(this).text());
                        var e = $("<li>");
                        e.text($(this).text());
                        $(".plannerUL").eq(i).append(e);
                        saveContent();
                    }
                }
                
            })
            
            eventName.text(events._embedded.events[i].name);
            eventUrl.text(events._embedded.events[i].url);
            //eventDate.text(events._embedded.events[i].dates.start.localDate + " " + events._embedded.events[i].dates.start.localTime);

            $('#events').append(eventName);
            $('#events').append(eventDate);
            $('#events').append(eventUrl);
            figure.append(eventImage);
            $('#events').append(figure);
            
            
            // $('#events').append(eventImage);
}

            


      });


}


$('#justEvents').on('click', function(){
    getEvents();
    $('justEvents').hide();
});


// ------------------------------------tabs-for-news-----------------------------------------------------------------------
$(".is-active").on("click", function(){
    var section = $(this).text().trim();
    var nyTimesKey = "f5Ql8CE6k7NqGhfkbESevpi2pGC8dDq3";
     var nyTimesUrl = "https://api.nytimes.com/svc/topstories/v2/" + section + ".json?api-key=" + nyTimesKey;

     $.ajax({
         url: nyTimesUrl,
         method: 'GET'
     }).then(function (response) {
             
         

            
                 $('#topStories').empty();
                 for (var i = 0; i < response.results.length; i ++) {
                     var link = $("<a target='_blank'>");
                     link.attr('href', (response.results[i].short_url));
                     link.text(response.results[i].title);
                     link.append($("<li>"));
                     $("#newsImg").attr("src", (response.results[0].multimedia[i].url));
                     console.log(response.results[i].multimedia[i].url, "imgUrl");
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
             if(searchTxt === ''){
                alert('Please Enter a Search Item');
               return false;}
     
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
                 for (var i = 0; i < searchRes.length; i += 2) {
                     var searchLink = $("<a target='_blank'>");
                     searchLink.attr('href', (searchRes[i].web_url));
                     searchLink.text(searchRes[i].headline.main);;
                     searchLink.append($("<li>"));
                     $("#newsImg").attr("src", "https://12bytes.org/wp-content/uploads/search.jpg");
                     $("#topStories").append(searchLink);
                     searchId.val('');
                 console.log(searchLink, "p");
                 }
                 })
                });
                searchId.keypress(function (e){
                    if (e.which === 13){
                        searchBtn.click();
                    }
         });

           //  --------------------------COVID-19-------------------------------------------------------------------------

        var cov = $("#cov");
        var covBtn = $("#covBtn");
    
        
        covBtn.click(function () {
            event.preventDefault();
    
            var nytSearckKey = "ZAYcM5GbhkBjdLu6GGSpxwqrYypoxmoG";
            var nytSearchUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + "Covid-19" +"&api-key=" + nytSearckKey;
            console.log(nytSearchUrl + "--CVURL--");
        
            
            $.ajax({
                url: nytSearchUrl,
                method: "GET"
            }).then(function (results) {
                console.log(results , "CO");
    
    
                var covRes = results.response.docs;
                $("#topStories").empty();
                for (var i = 0; i < covRes.length; i += 2) {
                    var covLink = $("<a target='_blank'>");
                    covLink.attr('href', (covRes[i].web_url));
                    covLink.text(covRes[i].headline.main);;
                    covLink.append($("<li>"));
                    $("#newsImg").attr("src", "https://www.skadden.com/-/media/images/social/twitter/caronavirus_1024x512.jpg");
                    $("#topStories").append(covLink);
                console.log(covLink, "coLink");
                
            }
                })

               });
               
                

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
    
    var openWeatherKey = "7f0107959f91d24fd331487876d42456";
    var openWeatherurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + openWeatherKey;

    $.ajax({
        url: openWeatherurl,
        method: 'GET'
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
        windSpeed.text("Wind: " + response.current.wind_speed + " MPH");
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


        ///// forecast area ..........................................

        var dailyForecast = response.daily.length;
        var forecast = $('#forecast');
        for(var i = 0; i < dailyForecast.length; i++){
            var day1Div = $('<div>');
            var temp = $('<p>');
             var humid = $('<p>');
             var wind = $('<p>');
             var uv = $('<p>');
            temp.text(response.daily[i].temp.day);
            humid.text(response.daily[i].humidity);
            wind.text(response.daily[i].wind_speed);
            uv.text(response.daily[i].uvi);

            day1Div.append(temp);
          forecast.append(day1Div);
          console.log(uv);
          
            
        }
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
                    lis = lis.replace(/,/g,'');
                // Creates lis with content from storage
                    $(".plannerUL").eq(e).append(lis);
                    $('.fas').on('click', function() {
    $(this).parent().remove();
});

$('.fa-times').on('click', function() {
    $(this).parent().remove();
});
                } else {
                    console.log("localstorage checked");
                    
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
            var lisArr = [];
            for (var y = 0; y < lis.length; y++) {
                if ($(".plannerUL").eq(i).children('li').eq(y).attr('data-position') === null) {

                } else if ($(".plannerUL").eq(i).children('li').eq(y).attr('data-position') === undefined) {

                } else {
                    lisArr.push($(".plannerUL").eq(i).children('li').eq(y).get(0).outerHTML);
                    localStorage.setItem($(".plannerHeader").eq(i).text(), lisArr);
                }
            }
            
        }
        
        
    }
}

function sortContent() {
    Array.prototype.slice.call(document.querySelectorAll('.plannerUL li')).sort(function(a, b) {
        if (a.getAttribute('data-position') === null || b.getAttribute('data-position') === null) {
            return;
        }
        
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
        aryDates.push(DayAsString(currentDate.getDay()) + " " + MonthAsString(currentDate.getMonth()) + ", " + currentDate.getDate() + " " + currentDate.getFullYear());
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
        p.addClass("date");

        // Setting date attribute
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate() + i -1;
        var year = dateObj.getUTCFullYear();

        if (day < 10) {
            newdate = year + "-" + month + "-" + "0" + day;
        } else {
            newdate = year + "-" + month + "-" + day;
        }
        

        p.attr("data-date", newdate);

        $(".plannerHeader").eq(i).prepend(p);

        


    }
    


}

labelPlanner();


// Adds User Event 
$('input:submit').on("click", function(event){
    event.preventDefault();
    // Gets data from sibling input and select
    var userEvent = $(this).siblings().eq(1).val();
    var userTime = $(this).siblings().eq(2).find('option:selected').text();
    var dataval = $(this).siblings().eq(2).find('option:selected').attr("data-position");
    

    // Creates li element
    var li = $("<li>");
    var icon = $("<i>");
    icon.on('click', function(){
        $(this).parent().remove();
    });
    icon.addClass("fas fa-times");
    li.text(userTime + " - " + userEvent);
    li.prepend(icon);
    li.attr("data-position", dataval);
    $(this).siblings().eq(0).append(li);
    sortContent();
    saveContent();

    
});

$("#clearSch").on("click", clearSchedule); 


})
