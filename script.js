(function(){
  const weatherLink = "https://api.openweathermap.org/data/2.5/weather?"; //&appid={appid}"
  let country = "us";
  const appID = "c995f07e425ec9556f3d0860a1157367";
  let fetchLink = '';
  let weather = {
    name: "South Boston",
    temperature: 54,
    weatherType: "Rain",
    maxTemp: 62,
    minTemp: 47,
    windSpeed: 3,
    windDir: 60,
    id: 800
  }
  // thunder: 200
  // drizzle: 300
  // rain:    500
  // snow:    600
  // fog:     700
  // clear:   800
  // cloudy:  801
  const weatherImageLinks = {
    thunder: {
      image: "lightning.jpg",
      textColor: "white"
    },
    drizzle: {
      image: "fog.jpg",
      textColor: "black"
    },
    rain: {
      image: "rain.jpg",
      textColor: "white"
    },
    snow: {
      image: "snow.jpg",
      textColor: "black"
    },
    fog: {
      image: "fog.jpg",
      textColor: "black"
    },
    clear: {
      image: "clear.jpg",
      textColor: "black"
    },
    cloudy: {
      image: "cloudy.jpg",
      textColor: "black"
    }
  }
  
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      fetchLink = weatherLink + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + appID;
      fetch(fetchLink)
      .then(res => res.json())
      .then((responseData) => {
        console.log(responseData);
        weather = getWeatherObj(responseData);
        setBackground(weather.id);
        if(document.getElementById("togUnits").checked) {
          displayWeatherFar(weather);
        } else {
          displayWeatherCel(weather);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }
  
  function getWeatherObj (data) {
    const obj = {
      name: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].main,
      maxTemp: data.main.temp_max,
      minTemp: data.main.temp_min,
      windSpeed: data.wind.speed,
      windDir: data.wind.deg,
      id: data.weather[0].id
    }
    console.log(obj);
    return obj
  }
  
  function displayWeatherFar(data) {
    document.getElementById("location-name").innerHTML = data.name;
    document.getElementById("temperature").innerHTML = Math.round(kelToFar(data.temperature)) + "&deg;";
    document.getElementById("condition").innerHTML = data.condition;
    document.getElementById("high").innerHTML = Math.round(kelToFar(data.maxTemp)) + "&deg;";
    document.getElementById("low").innerHTML = Math.round(kelToFar(data.minTemp)) + "&deg;";
    document.getElementById("svg").style.transform = "rotate(" + Math.round(data.windDir) + "deg)";
    document.getElementById("wind-speed").innerHTML = Math.round(mpsToMiles(data.windSpeed)) + "<span class='mph'> mi/h</span>";
  }
  
  function displayWeatherCel(data) {
    document.getElementById("location-name").innerHTML = data.name;
    document.getElementById("temperature").innerHTML = Math.round(kelToCel(data.temperature)) + "&deg;";
    document.getElementById("condition").innerHTML = data.condition;
    document.getElementById("high").innerHTML = Math.round(kelToCel(data.maxTemp)) + "&deg;";
    document.getElementById("low").innerHTML = Math.round(kelToCel(data.minTemp)) + "&deg;";
    document.getElementById("svg").style.transform = "rotate(" + Math.round(data.windDir) + "deg)";
    document.getElementById("wind-speed").innerHTML = Math.round(data.windSpeed) + "<span class='mph'> m/s</span>";
  }
  
  document.getElementById("togUnits").addEventListener("click", function() {
    if (document.getElementById("togUnits").checked) {
      displayWeatherFar(weather);
    }
    else{
      displayWeatherCel(weather);
    }
  });
  
  //
  //  Conversions
  //
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
  function mpsToMiles(speed) {
    let mph = speed * 2.237
    return mph
  }
  // Background
  function setBackground(code) {
    let bg = "clear.jpg";
    let color = "black";
    let weatherContainer = document.getElementById("weather-container");
    let floorCode = 0;
    if (code > 800) {
      floorCode = 801;
    }
    else {
      floorCode = Math.floor(code / 100) * 100;
    }
    switch(floorCode) {
      case 200: {
        bg = weatherImageLinks.thunder.image;
        color = weatherImageLinks.thunder.textColor;
        break;
      }
      case 300: {
        bg = weatherImageLinks.fog.image;
        color = weatherImageLinks.fog.textColor;
        break;
      }
      case 500: {
        bg = weatherImageLinks.rain.image;
        color = weatherImageLinks.rain.textColor;
        break;
      }
      case 600: {
        bg = weatherImageLinks.snow.image;
        color = weatherImageLinks.snow.textColor;
        break;
      }
      case 700: {
        bg = weatherImageLinks.fog.image;
        color = weatherImageLinks.fog.textColor;
        break;
      }
      case 800: {
        bg = weatherImageLinks.clear.image;
        color = weatherImageLinks.clear.textColor;
        break;
      }
      case 801: {
        bg = weatherImageLinks.cloudy.image;
        color = weatherImageLinks.cloudy.textColor;
        break;
      }
      default: {
        bg = "clear.jpg";
        color = "black";
      }
    }
    weatherContainer.style.backgroundImage = "url(images/" + bg;
    weatherContainer.style.color = color;
    if(color === "black") {
      weatherContainer.style.textShadow = "0px 0px 1px white";
    }
    else {
      weatherContainer.style.textShadow = "0px 0px 1px black";
    }
  }
})();

