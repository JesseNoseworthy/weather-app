var weatherWidget = {
// we create an empty variable so we can add key/value pairs to it
}

weatherWidget.apiUrl = 'http://api.wunderground.com/api/337af19245ace9e1/conditions/q/canada/toronto.json';
// key below already exists in the url above, no need to call it.
weatherWidget.key = '337af19245ace9e1';

weatherWidget.getData = function() {
	// The code in here is used to initialize our application
	// When the page loads get some data
	// Make an AJAX call to the wundergrounds API
	$.ajax({
		url: weatherWidget.apiUrl,
		// data: {
		// 	key: weatherWidget.key
		// },
		method: 'GET',
		dataType: 'json'
	})
	.then(function(weatherInfo) {
		// We store the info in a variable that we then add to the displayWeather object
		// This is a more DRY way and more dynamic 
		var obrservation = weatherInfo.current_observation;
		// We pass 'observation' into displayerWeather as a parameter 
		weatherWidget.displayerWeather(obrservation);
	});
};

weatherWidget.displayWeather = function(weather) {
	// We then access our information that we stored within this method
	var image = weather.icon_url;
	$('.weather_image').attr('src', image);
	var condition = weather.weather; 
	$('.weather_string').text(condition);
	var temp = weather.temp_c;
	$('.temp_c').text(temp);
	var city = weather.display_location.city;
	$('.city_name').text(city);
	var time = weather.local_time_rfc822;
	$('.date_time').text(time);
}

weatherWidget.init = function() {
	weatherWidget.getData();
};

// .init(initialize) now allows us to have a cleaner document ready 
$(document).ready(function(){
  weatherWidget.init();
});