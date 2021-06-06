'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

const geoPosition = function (position) {

  const { latitude, longitude } = position.coords;
  // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

  // const map = L.map('map').setView([51.505, -0.09], 13);
  const coordsArray = [latitude, longitude];
  map = L.map('map').setView(coordsArray, 15);
  
  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const mapMarker = function (mapE) {
    mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  };

  map.on("click", mapMarker);
  
};

const geoPositionError = function () {
  alert("Could not get position");
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(geoPosition, geoPositionError);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
  const { lat, lng } = mapEvent.latlng;
  L.marker([ lat, lng ])
    .addTo(map)
    .bindPopup(L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: "running-popup",
    }))
    .setPopupContent("Workout")  
    .openPopup();
});

inputType.addEventListener("change", function () {
  inputElevation.closest("div.form__row").classList.toggle("form__row--hidden");
  inputCadence.closest("div.form__row").classList.toggle("form__row--hidden");
});

