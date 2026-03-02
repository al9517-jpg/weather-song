//define variable for our location
let locationField;
let audioCtx;
let freq = 0;
let infoField;
//wait until html document is loaded so that we can access the keyboard input field
document.addEventListener('DOMContentLoaded', function(event) { 
  //locationField = document.getElementById("location");
  locationField = document.querySelector("#location");
  infoField = document.getElementById('info');
})

// create web audio api context
audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = "square";
oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);
oscillator.start();

function weather(){
  console.log(locationField.value);

fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+locationField.value +'?key=YH5QF5SWJL5LZ8SFPZFT2RCC2')
	.then(response => response.json())
	.then(response => {
    const today = response.days[0];
    freq = today.temp + 50; 
    console.log(freq - 50); 
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); 
    audioCtx.resume();
    const conditions = today.conditions.toLowerCase()
    infoField.innerHTML = "the weather in " + locationField.value + " is " + response.days[0].temp
    if (response.days[0].temp < 60) {
      infoField.innerHTML += ", which is colder than usual, and the weather is "
    }
    else {
      infoField.innerHTML += ", which is warmer than usual, and the weather is "
    }
      if (conditions.includes("snow")) {
        infoField.innerHTML += "❄️ Snowy";
      }
      else if (conditions.includes("rain")) {
        infoField.innerHTML += "🌧️ Rainy";
      }
      else if (conditions.includes("thunder")) {
        infoField.innerHTML += "⛈️ Thunderstorm";
      }
      else if (conditions.includes("mist") || conditions.includes("fog")) {
        infoField.innerHTML += "🌫️ Misty/Foggy";
      }
      else if (conditions.includes("wind")) {
        infoField.innerHTML += "💨 Windy";
      }
      else if (conditions.includes("cloud")) {
        infoField.innerHTML += "☁️ Cloudy";
      }
      else if (conditions.includes("clear")) {
        infoField.innerHTML += "☀️ Sunny";
      }
      else {
        infoField.innerHTML += "🌤️ " + today.conditions;
      }
  })
	.catch(err => console.error(err));
}

function stop(){
  audioCtx.suspend();
}






