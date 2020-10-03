var openWeatherKey = "7f0107959f91d24fd331487876d42456";
var openWeatherurl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=" + openWeatherKey;

var calendarificKey = "	f51769744b4472595fff806872c68a32095c4dc4";
var calendarificurl = "https://calendarific.com/api/v2/holidays?api_key=" + calendarificKey;

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
