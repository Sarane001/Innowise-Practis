const link = 
    "http://api.weatherstack.com/current?access_key=2ee14621147847388a2160703222103";

    const root = document.getElementById('root');
    const popup = document.getElementById('popup');
    const textInput = document.getElementById('text-input');
    const form = document.getElementById('form');
    const popupClose = document.getElementById('close');


    let store = {
        city: "Minsk",
        feelslike: 0,
        temperature: 0,
        observationTime: "00:00 AM",
        isDay: "yes",
        weatherDescriptions: "",
        properties: {
            cloudcover: {},
            humidity: {},
            windSpeed: {},
            visibility: {},
            pressure: {},
            uvIndex: {},
        },
    };

const fetchData = async () => {
    try {
        const query = localStorage.getItem('query') || store.city;
        const result = await fetch(`${link}&query=${query}`);
        const data = await result.json();

        const { 
          current: { 
            feelslike, 
            cloudcover, 
            temperature, 
            humidity,
            observation_time: observationTime, 
            pressure, 
            uv_index: uvIndex, 
            visibility, 
            is_day: isDay, 
            weather_descriptions: weatherDescriptions,
            wind_speed: windSpeed,

        }, 
        location: { name },
    } = data;

    store = {
        ...store,
        city: name,
        feelslike,
        temperature,
        observationTime,
        isDay,
        weatherDescriptions: weatherDescriptions[0],
        properties: {
            cloudcover: {
              title: "cloudcover",
              value: `${cloudcover}%`,
              icon: "cloud.png",
            },
            humidity: {
              title: "humidity",
              value: `${humidity}%`,
              icon: "humidity.png",
            },
            windSpeed: {
              title: "wind speed",
              value: `${windSpeed} kmph`,
              icon: "wind.png",
            },
            pressure: {
              title: "pressure",
              value: `${pressure} mb`,
              icon: "gauge.png",
            },
            uvIndex: {
              title: "uv Index",
              value: `${uvIndex} / 100`,
              icon: "uv-index.png",
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

const getImage = (weatherDescriptions) => {
    const value = weatherDescriptions.toLowerCase();
  
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

        return `<div class="property">
                <div class="property-icon">
                    <img src="./img/icons/${icon}" alt="">
                </div>
                <div class="property-info">
                    <div class="property-info__value">${value}</div>
                    <div class="property-info__description">${title}</div>
                </div>
            </div>`;
    })
    .join("");
};

const markup = () => {
    const {city, weatherDescriptions, observationTime, temperature, isDay, properties } = store;
    const containerClass = isDay === "yes" ? "is-day" : "is-night";

    return `<div class="container ${containerClass}">
                <div class="top">
                <div class="city">
                  <div class="city-subtitle">Weather Today in</div>
                    <div class="city-title" id="city">
                    <span>${city}</span>
                  </div>
                </div>
                <div class="city-info">
                    <div class="top-left">
                    <img class="icon" src="./img/${getImage(weatherDescriptions)}" alt="" />
                    <div class="description">${weatherDescriptions}</div>
                </div>
                
                <div class="top-right">
                    <div class="city-info__subtitle">as of ${observationTime}</div>
                    <div class="city-info__title">${temperature}°C</div>
                </div>
                </div>
            </div>
            <div id="properties">${renderProperty(properties)}</div>
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

const city = document.getElementById("city");
city.addEventListener("click", togglePopupClass);
};

const handleInput = (e) => {
    store = {
        ...store,
        city: e.target.value,
    };
};

const handleSubmit = (e) => {
    e.preventDefault();
    const value = store.city

    if(!value) return null;

    localStorage.setItem('query', value);
    fetchData();
    togglePopupClass();
};

form.addEventListener('submit', handleSubmit);

textInput.addEventListener('input', handleInput);

fetchData();