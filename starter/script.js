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


const geoPosition = function (position) {
  const { latitude, longitude } = position.coords;
  console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

  // const map = L.map('map').setView([51.505, -0.09], 13);
  const coordsArray = [latitude, longitude];
  const map = L.map('map').setView(coordsArray, 14);

  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // L.marker([51.5, -0.09]).addTo(map)
  L.marker(coordsArray)
    .addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

};

const geoPositionError = function () {
  alert("Could not get position");
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(geoPosition, geoPositionError);
};




















// const geoPosition = function (position) {
//   console.log(position.coords);
//   const { latitude, longitude } = position.coords;
//   console.log(latitude);
//   console.log(longitude);
//   console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
// };

// const geoPositionError = function () {
//   alert("Could not get position");
// };

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(geoPosition, geoPositionError);
// };
