//객체에 변수의 이름과 객채의 key의 이름을 같게 저장할때는
//latitude: latitude,
//longtitude:longitude
// 아래와 같이 표현 가능하다
const weather = document.querySelector(".js-weather");
const API_KEY = "b70df62370e065ef390918f041d19a61";
const COORDS = "coords";

function getWeather(lat, lng) {
  // 데이터를 얻기위해 fetch사용
  //   데이터를 받았을때 then 함수 안에 함수가 동작되기 위해 then 사용
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(json) {
      // then한번더 쓴거는 body안에 있는 값을 아직 호출 받지 못해서 얻으려는 편법
      console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}@${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  //console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("cant access geo loacation");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
}
init();
