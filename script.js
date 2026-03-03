//define variable for our location
let locationField;
let freq = 0;
let infoField;
//wait until html document is loaded so that we can access the keyboard input field
document.addEventListener('DOMContentLoaded', function(event) { 
  //locationField = document.getElementById("location");
  locationField = document.querySelector("#location");
  infoField = document.getElementById('info');
})

function weather(){
  const img = document.getElementById("image");

fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+locationField.value +'?key=YH5QF5SWJL5LZ8SFPZFT2RCC2')
	.then(response => response.json())
	.then(response => {
    const today = response.days[0];
    const conditions = today.conditions.toLowerCase();
    infoField.innerHTML = "the weather in " + locationField.value + " is " + response.days[0].temp
    if (response.days[0].temp < 60) {
      infoField.innerHTML += ", which is colder than usual, and the weather is "
    }
    else {
      infoField.innerHTML += ", which is warmer than usual, and the weather is "
    }
      if (conditions.includes("snow")) {
        img.src = "Snow.png";
        infoField.innerHTML += "❄️ Snowy";
      }
      else if (conditions.includes("rain")) {
        img.src = "Rain.png";
        infoField.innerHTML += "🌧️ Rainy";
      }
      else if (conditions.includes("thunder")) {
        img.src = "Thunder.png";
        infoField.innerHTML += "⛈️ Thunderstorm";
      }
      else if (conditions.includes("mist") || conditions.includes("fog")) {
        img.src = "Fog.png";
        infoField.innerHTML += "🌫️ Misty/Foggy";
      }
      else if (conditions.includes("wind")) {
        img.src = "Wind.png";
        infoField.innerHTML += "💨 Windy";
      }
      else if (conditions.includes("cloud")) {
        img.src = "Cloud.png";
        infoField.innerHTML += "☁️ Cloudy";
      }
      else if (conditions.includes("clear")) {
        img.src = "Sun.png";
        infoField.innerHTML += "☀️ Sunny";
      }
      else {
        img.src = "Droplet.png";
        infoField.innerHTML += "🌤️ " + today.conditions;
      }
  })
	.catch(err => console.error(err));
}




