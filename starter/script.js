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

class Workout {

  date = new Date();
  id = (Date.now() + "").slice(-10);
    
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  };

};

class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  };
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  };
};

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  };

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  };
};

class App {

  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
  };

  _getPosition() {
    const geoPositionError = function () {
      alert("Could not get position");
    };
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), geoPositionError);
    };
  };

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
      // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    
      // const map = L.map('map').setView([51.505, -0.09], 13);
    const coordsArray = [latitude, longitude];
    this.#map = L.map('map').setView(coordsArray, 15);
      
      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);
    
    this.#map.on("click", this._showForm.bind(this));
  
  };

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  };

  _toggleElevationField() {
    inputElevation.closest("div.form__row").classList.toggle("form__row--hidden");
    inputCadence.closest("div.form__row").classList.toggle("form__row--hidden");
  };

  _newWorkout(e) {

    const validInputs = (...inputs) => {
      return inputs.every( input => Number.isFinite(input) );
    };
    
    const allPositive = (...inputs) => {
      return inputs.every( input => input > 0 );
    };    

    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    
    // If workout running, create running object
    if (type === "running") {
      const cadence = +inputCadence.value;
      // Check if data is valid
      // if (!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence)) {
      if ( !validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence) ) {
        return ( alert("Inputs have to be a positive numbers!") );
      };
      workout = new Running([lat, lng], distance, duration, cadence);
    };
    
    // If workout cycling, create cycling object
    if (type === "cycling") {
      // Check if data is valid
      const elevation = +inputElevation.value;
      if ( !validInputs(distance, duration, elevation) || !allPositive(distance, duration) ) {
        return ( alert("Inputs have to be a positive numbers!") );
      };
      workout = new Cycling([lat, lng], distance, duration, elevation);
    };
    
    // Add new object to workout array
    this.#workouts.push(workout);
    
    // Render workout on map as market
    this.renderWorkoutMarker(workout);
    // Render workout on list
    
    // Hide form and clear input fields
    
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
    
  };
  
  renderWorkoutMarker(workout) {
    console.log(workout);
    L.marker(workout.coords)
    // L.marker([ lat, lng ])
    .addTo(this.#map)
    .bindPopup(L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      // className: "running-popup",
      className: `${workout.type}-popup`,
    }))
    .setPopupContent("workout")  
    .openPopup();
  };

};

const app = new App();


