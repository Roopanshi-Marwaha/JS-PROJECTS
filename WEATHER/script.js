const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

function getWeather(city) {
  fetch(`https://wttr.in/${city}?format=j1`)
    .then(res => res.json())
    .then(data => {
      const current = data.current_condition[0];
      const desc = current.weatherDesc[0].value.toLowerCase();

      document.getElementById('cityName').textContent = city.toUpperCase();
      document.getElementById('weatherDesc').textContent = current.weatherDesc[0].value;
      document.getElementById('temp').textContent = current.temp_C;
      document.getElementById('feelsLike').textContent = current.FeelsLikeC;
      document.getElementById('humidity').textContent = current.humidity;
      document.getElementById('wind').textContent = current.windspeedKmph;

      document.getElementById('weatherCard').classList.remove('d-none');
      document.getElementById('placeholder').classList.add('d-none');

      document.body.className = '';

      if (desc.includes('sunny') || desc.includes('clear')) {
        document.body.classList.add('sunny');
      } else if (desc.includes('cloud')) {
        document.body.classList.add('cloudy');
      } else if (desc.includes('rain') || desc.includes('drizzle')) {
        document.body.classList.add('rainy');
      } else if (desc.includes('snow')) {
        document.body.classList.add('snow');
      } else if (desc.includes('thunder') || desc.includes('storm')) {
        document.body.classList.add('thunderstorm');
      } else {
        document.body.classList.add('default-bg');
      }
    })
    .catch(err => {
      alert("⚠️ Could not fetch weather. Try another city.");
      console.error(err);
    });
}
