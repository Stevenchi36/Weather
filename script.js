const appID = "c995f07e425ec9556f3d0860a1157367"
let country = "us"
const weatherLink = "https://api.openweathermap.org/data/2.5/weather?" //&appid={appid}"
let fetchLink = ''
let temperature = 0
const weatherImageLinks = {
  thunder: "200",
  drizzle: "300",
  rain: "500",
  snow: "600",
  fog: "700",
  clear: "800",
  cloudy: "801"
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    fetchLink = weatherLink + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + appID
    fetch(fetchLink)
      .then(res => res.json())
      .then((weather) => {
        console.log(weather)
        displayWeather(weather)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

function displayWeather(data) {
  document.getElementById("location-name").innerHTML = data.name
  document.getElementById("temperature").innerHTML = Math.round(kelToFar(data.main.temp)) + "&deg;"
  document.getElementById("condition").innerHTML = data.weather[0].main
  document.getElementById("high").innerHTML = Math.round(kelToFar(data.main.temp_max)) + "&deg;"
  document.getElementById("low").innerHTML = Math.round(kelToFar(data.main.temp_min)) + "&deg;"
  document.getElementById("svg").style.transform = "rotate(" + Math.round(data.wind.deg) + "deg)"
  document.getElementById("wind-speed").innerHTML = Math.round(mpsToMph(data.wind.speed)) + "<span class='mph'> mi/h</span>";
}

function kelToCel(temp) {
  let cel = temp - 273.15
  return cel
}
function kelToFar(temp) {
  // (0K − 273.15) × 9/5 + 32 = -459.7°F
  let cel = temp - 273.15
  let far = cel * 9 / 5 + 32
  return far
}
function mpsToMph(speed) {
  let mph = speed * 2.237
  return mph
}