fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=02c241e5f5c19e653240d087fd657644')
    .then(function (resp) { return resp.json() } )
    .then(function (data) {
        console.log(data);
        document.querySelector('.city-info__title').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
        document.querySelector('.city-title').innerHTML = data.name;
        document.querySelector('.city-info__subtitlesunrise').innerHTML = (new Date(data.sys.sunrise)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' PM';
        document.querySelector('.city-info__subtitlesunset').innerHTML = (new Date(data.sys.sunset)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' AM';
        document.querySelector('.description').textContent = data.weather[0] ['description'];
        document.querySelector('.humidity1').innerHTML = data.main.humidity + '%';
        document.querySelector('.pressure2').innerHTML = (data.main.pressure / 1000) + ' mBar';
        document.querySelector('.windespeed3').innerHTML = Math.floor(data.wind.speed * 1.6093) + 'km/h';
        //document.querySelector('.icon').innerHTML = '<img src = "http://openweathermap.org/img/wn/' + data.weather[0]['icon'] + '@2x.png">';
    })
    .catch(function () {

    });

fetch('https://api.openweathermap.org/data/2.5/forecast?lat=51.51958660936145&lon=-0.13662368334883396&appid=02c241e5f5c19e653240d087fd657644')
    .then(function (resp1) { return resp1.json() } )
    .then(function (data1) {
      console.log(data1);
      document.querySelector('.hour11').innerHTML = (new Date(data1.list[0].dt_txt)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      + `<img src = "http://openweathermap.org/img/wn/${data1.list[0].weather[0]['icon']}@2x.png">`
      + Math.round(data1.list[0].main.temp - 273) + '&deg;';
      document.querySelector('.hour22').innerHTML = (new Date(data1.list[1].dt_txt)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      + `<img src = "http://openweathermap.org/img/wn/${data1.list[1].weather[0]['icon']}@2x.png">`
      + Math.round(data1.list[1].main.temp - 273) + '&deg;';
      document.querySelector('.hour33').innerHTML = (new Date(data1.list[2].dt_txt)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      + `<img src = "http://openweathermap.org/img/wn/${data1.list[2].weather[0]['icon']}@2x.png">`
      + Math.round(data1.list[2].main.temp - 273) + '&deg;';
      document.querySelector('.hour44').innerHTML = (new Date(data1.list[3].dt_txt)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      + `<img src = "http://openweathermap.org/img/wn/${data1.list[3].weather[0]['icon']}@2x.png">`
      + Math.round(data1.list[3].main.temp - 273) + '&deg;';
      document.querySelector('.days1').innerHTML = (new Date(data1.list[7].dt_txt)).toLocaleDateString([], {day: '2-digit', month:'2-digit'}) + '<br/>'
      + (new Date(data1.list[15].dt_txt)).toLocaleDateString([], {day: '2-digit', month:'2-digit'}) + '<br/>'
      + (new Date(data1.list[23].dt_txt)).toLocaleDateString([], {day: '2-digit', month:'2-digit'});
      document.querySelector('.icones1').innerHTML = `<img src = "http://openweathermap.org/img/wn/${data1.list[7].weather[0]['icon']}@2x.png">`
      + `<img src = "http://openweathermap.org/img/wn/${data1.list[15].weather[0]['icon']}@2x.png">`
      + `<img src = "http://openweathermap.org/img/wn/${data1.list[23].weather[0]['icon']}@2x.png">`;
      document.querySelector('.daytemp1').innerHTML = Math.round(data1.list[7].main.temp - 273) + '&deg;<br/>' + Math.round(data1.list[15].main.temp - 273) + '&deg;<br/>' + Math.round(data1.list[23].main.temp - 273) + '&deg;';
      document.querySelector('.nighttemp1').innerHTML = Math.round(data1.list[3].main.temp - 273) + '&deg;<br/>' + Math.round(data1.list[11].main.temp - 273) + '&deg;<br/>' + Math.round(data1.list[19].main.temp - 273) + '&deg;';
    })
    
    .catch(function () {

    });














const link = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=02c241e5f5c19e653240d087fd657644";

    const root = document.getElementById('root');
    const popup = document.getElementById('popup');
    const textInput = document.getElementById('text-input');
    const form = document.getElementById('form');
    const popupClose = document.getElementById('close');

    const store = {
        name: "London",
        // temp: 0,
        main: {
          temp: 280.32,
          "pressure": 1012,
          "humidity": 81,
          "temp_min": 279.15,
          "temp_max": 281.15
        },
        dt: "00:00 AM",
        sunset: "06:00 PM",
        sunrise: "07:00 AM",
        isDay: "no",
        description: "partly cloudy",
        properties: {
            all: {},
            humidity: {},
            speed: {},
            visibility: {},
            pressure: {},
        },
    };

const fetchData = async () => {
    try {
        const query = localStorage.getItem('query') || store.name;
        const result = await fetch(`${link}&q=${query}`);
        const data = await result.json();

        const { 
          current: { 
            all, 
            temp, 
            humidity,
            dt: dt, 
            pressure, 
            visibility, 
            is_day: isDay, 
            description: description,
            wind_speed: speed,
        }, 
        location: { name },
    } = data;

    store = {
        ...store,
        name: name,
        temp,
        dt,
        isDay,
        description: description[0],
        properties: {
          all: {
              title: "Сloudcover",
              value: `${all}%`,
              icon: "cloud.png",
            },
            humidity: {
              title: "Humidity",
              value: `${humidity}%`,
              icon: "humidity.png",
            },
            speed: {
              title: "wind speed",
              value: `${speed} kmph`,
              icon: "wind.png",
            },
            pressure: {
              title: "pressure",
              value: `${pressure} mb`,
              icon: "gauge.png",
            },
            visibility: {
              title: "visibility",
              value: `${visibility}m`,
              icon: "visibility.png",
            },
        },
    };

    renderComponent();
    } catch(err) {
        console.log(err);
      }
};

const getImage = (description) => {
    const value = description.toLowerCase();
  
    switch (value) {
      case "partly cloudy":
        return "partly.png";
      case "cloud":
        return "cloud.png";
      case "fog":
        return "fog.png";
      case "sunny":
        return "sunny.png";
      case "cloud":
        return "cloud.png";
      default:
        return "the.png";
    }
  };

const renderProperty = (properties) => {
    return Object.values(properties).map((data) => {
        const {title, value, icon} = data;

        return })
};

const markup = () => {
    const {name, description, dt, temp, isDay, properties, sunset, sunrise } = store;
    const containerClass = isDay === "yes" ? "is-day" : "is-night";

    return `<div class="container ${containerClass}">
                <div class="top">
                <div class="city">
                  <div class="city-subtitle">Weather Today in</div>
                    <div class="city-title" id="city">
                    <span>${name}</span>
                  </div>
                </div>
                <div class="city-info">
                    <div class="top-left">
                    <img class="icon" src="./img/${getImage(description)}" alt="" />
                    <div class="description">${description}</div>
                </div>
                
                <div class="top-right">
                    <div class="city-info__title">${temp}°</div>
                    <div class="city-info__subtitlesunset">${sunset}</div>
                    <div class="city-info__subtitlesunrise">${sunrise}</div>
                </div>
                </div>
            </div>`;
};

const togglePopupClass = () => {
    popup.classList.toggle("active");
  };

const renderComponent = () => {
    root.innerHTML = markup();

popupClose.addEventListener('click', () => {     // Закрытие выбора города (баг если много кликать иногда не закрывает???)
    popup.classList.toggle("active");
});

const name = document.getElementById("favoriteicone");
name.addEventListener("click", togglePopupClass);
};

const handleInput = (e) => {
    store = {
        ...store,
        name: e.target.value,
    };
};

const handleSubmit = (e) => {
    e.preventDefault();
    const value = store.name

    if(!value) return null;

    localStorage.setItem('query', value);
    fetchData();
    togglePopupClass();
};

form.addEventListener('submit', handleSubmit);

textInput.addEventListener('input', handleInput);

fetchData();
renderComponent();