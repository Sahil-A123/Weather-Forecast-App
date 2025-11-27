// const url =
// 	'https://api.openweathermap.org/data/2.5/weather';
// const apiKey =
// 	'f00c38e0279b7bc85480c3fe775d518c';

// $(document).ready(function () {
// 	weatherFn('Pune');
// });

// async function weatherFn(cName) {
// 	const temp =
// 		`${url}?q=${cName}&appid=${apiKey}&units=metric`;
// 	try {
// 		const res = await fetch(temp);
// 		const data = await res.json();
// 		if (res.ok) {
// 			weatherShowFn(data);
// 		} else {
// 			alert('City not found. Please try again.');
// 		}
// 	} catch (error) {
// 		console.error('Error fetching weather data:', error);
// 	}
// }

// function weatherShowFn(data) {
// 	$('#city-name').text(data.name);
// 	$('#date').text(moment().
// 		format('MMMM Do YYYY, h:mm:ss a'));
// 	$('#temperature').
// 		html(`${data.main.temp}°C`);
// 	$('#description').
// 		text(data.weather[0].description);
// 	$('#wind-speed').
// 		html(`Wind Speed: ${data.wind.speed} m/s`);
// 	$('#weather-icon').
// 		attr('src',
// 			`...`);
// 	$('#weather-info').fadeIn();
// }




// API key
const url = 'https://api.openweathermap.org/data/2.5/weather';

const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

function changeBackground(weatherMain) {
  const body = document.body;
  const weather = weatherMain.toLowerCase();
  if (weather.includes("cloud"))
    body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
  else if (weather.includes("rain"))
    body.style.background = "linear-gradient(to right, #4b79a1, #283e51)";
  else if (weather.includes("clear"))
    body.style.background = "linear-gradient(to right, #56ccf2, #2f80ed)";
  else if (weather.includes("snow"))
    body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
  else if (weather.includes("storm"))
    body.style.background = "linear-gradient(to right, #000000, #434343)";
  else
    body.style.background = "linear-gradient(to right, #e0eafc, #cfdef3)";
}

function getWeather(city) {
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, function(data) {
    $("#city-name").text(`${data.name}, ${data.sys.country}`);
    $("#date").text(moment().format('dddd, MMMM Do YYYY, h:mm A'));
    $("#temperature").text(`🌡️ Temperature: ${data.main.temp} °C`);
    $("#description").text(`🌥️ ${data.weather[0].description}`);
    $("#humidity").text(`💧 Humidity: ${data.main.humidity}%`);
    $("#feels-like").text(`🤗 Feels Like: ${data.main.feels_like} °C`);
    $("#wind-speed").text(`🌬️ Wind Speed: ${data.wind.speed} m/s`);

    // 🌤️ Weather Icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    $("#weather-icon").attr("src", iconUrl);

    // Background change
    changeBackground(data.weather[0].main);
  }).fail(function() {
    alert("City not found! Please check the name and try again.");
  });
}

$("#city-input-btn").click(function() {
  const city = $("#city-input").val();
  getWeather(city);
});
