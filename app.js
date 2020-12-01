const tl = gsap.timeline({defaults: {ease: "power1.out"}});

tl.to('.text', {y: '0%', duration:1, stagger:0.25 })
tl.to('.slider', {y: "-100%", duration:1.5, delay: 0.5})
tl.to('.intro', {y: "-100%", duration: 1}, "-=1")
tl.fromTo('nav', {opacity: 0}, {opacity: 1, duration:2})
tl.fromTo('.big-text', {opacity: 0}, {opacity: 1, duration:2}, '-=2')

const api = {
    key: "f7d26e260a210be06ae79c408082157e",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
  
function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }