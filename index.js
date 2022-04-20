import css from "./style.css";

const apilink = 'https://api.openweathermap.org/data/2.5/weather?appid=02c241e5f5c19e653240d087fd657644&';
const apilinkweek = "https://api.openweathermap.org/data/2.5/forecast?appid=02c241e5f5c19e653240d087fd657644&";

const weatherRequest = async(city) => {
  
  const link = await fetch(`${apilink}q=${city}`)
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
        document.querySelector('.Locationname1').innerHTML = data.name + ', ' + data.sys.country;
        document.querySelector('.Locationweathericone1').innerHTML = `<img src = "http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        document.querySelector('.Locationweatherdescription').innerHTML = data.weather[0].main;
        document.querySelector('.Locationtemp').innerHTML = Math.round(data.main.temp - 273) + '&deg;C';
        document.querySelector('.lwindespeed3').innerHTML = Math.floor(data.wind.speed * 1.6093) + 'km/h';
        document.querySelector('.lhumidity1').innerHTML = data.main.humidity + '%';
        document.querySelector('.lpressure2').innerHTML = (data.main.pressure / 1000) + ' mBar';

        store = {...store, name:data.name, 
          temp:Math.round(data.main.temp - 273), 
          sunset:new Date(data.sys.sunset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' AM', 
          sunrise:new Date(data.sys.sunrise).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' PM',};
        console.log(store);

        ///////////////////////////////////////////////////////////////////////////////
        const favoritecityList = [];

        // сохранине городов в локал
        // if (localStorage.getItem('favoritecity1') !== undefined) {
        //   favoritecityList = JSON.parse(localStorage.getItem('favoritecity1'));
        //   outfavoritecity();
        //   console.log(favoritecityList);
        // };

        addfavorite.onclick = function() {
          addfavorite.classList.toggle('active');
          
          const city1 = {};
          const name = data.name;
          const temp = Math.round(data.main.temp - 273) + '&deg;';
          const locationweathericone = `<img src = "http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
          const country = data.sys.country;
          const humidity = data.main.humidity + '%';
          const windespeed = Math.floor(data.wind.speed * 1.6093) + 'km/h';
          city1.favorite = temp + '   ' + locationweathericone + '<br/>' + name + '<br/>' + country + '<br/>' + `<img src="./img/humidity1.png">` + humidity + `<img src="./img/windespeed3.png">` + windespeed;
          const i = favoritecity.length;
          favoritecityList[i] = city1;
          console.log(favoritecity);
          outfavoritecity();
          localStorage.setItem('favoritecity1', JSON.stringify(city1.favorite));
        };

        // авто создангие контейнеров?
        // const markup1 = () => {
        //   const {city1} = store;
        //   const favoritecityclass = city1;
        //   return `<div class="containerfavoritecity"
        //                 <div id="favoritecity1"
        //           </div>`;
        // };

        function outfavoritecity() {
          let outfavoritecity = '';
          for (const key in favoritecityList) {
            outfavoritecity += favoritecityList[key].favorite;
          }
          document.getElementById('favoritecity1').innerHTML = outfavoritecity;
        }
        return data 
        ///////////////////////////////////////////////////////////////////////////////
    })
    .catch(function () {

    });
    console.log(link);

    const {lat,lon} = link.coord;

    const link2 = fetch(`${apilinkweek}lat=${lat}&lon=${lon}`)
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
    
    .catch(function (data1) {

    });
}

    //const link = "'https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=02c241e5f5c19e653240d087fd657644'";
    const root = document.getElementById('root');
    const popupfavorite = document.getElementById('popupfavorite');
    const textInput = document.getElementById('text-input');
    const form = document.getElementById('form');
    const popupfavoriteClose = document.getElementById('closefavorite');
    const popupactual = document.getElementById('popupactual');
    const popupactualClose = document.getElementById('closeactual');
    
    let store = {
        description: "partly cloudy",

    };

// const fetchData = async () => {
//     try {
//         const query = localStorage.getItem('query') || store.name;
//         const result = await fetch(`${link}&q=${query}`);
//         const data = await result.json();
//         console.log(data);

//         const { 
//           current: { 

//             is_day: isDay, 
//             description: description,

//         }, 

//     } = data;

//     store = {
//         ...store,

//         isDay,
//         description: description[0],
       
//     };

//     renderComponentfavorite();
//     } catch(err) {
//         console.log(err);
//       }
// };

const markup = () => {
    const {name, description, temp, isDay, sunset, sunrise } = store;
    const containerClass = isDay === "d" ? "is-day" : "is-night";

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
                    <div class="icon">
                    </div>
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

const togglePopupfavoriteClass = () => {
  popupfavorite.classList.toggle("active");
  };

const renderComponentfavorite = () => {
    root.innerHTML = markup();

popupfavoriteClose.addEventListener('click', () => {     
  popupfavorite.classList.toggle("active");
});

const name = document.getElementById("favoriteicone");
name.addEventListener("click", togglePopupfavoriteClass);
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
    weatherRequest(value);
    fetchData();
    togglePopupfavoriteClass();
};

const togglePopupactualClass = () => {
  popupactual.classList.toggle("active");
  };

const renderComponentSettings = () => {
    root.innerHTML = markup();

popupactualClose.addEventListener('click', () => {     
  popupactual.classList.toggle("active");
});

const name1 = document.getElementById("linesicone");
name1.addEventListener("click", togglePopupactualClass);
};

form.addEventListener('submit', handleSubmit);

textInput.addEventListener('input', handleInput);




const fetchData = async () => {
  try {
      const query = localStorage.getItem('query') || store.name;
      const result = await fetch(`${apilink}q=${query}`);
      const data = await result.json();
      console.log(data);

  renderComponentfavorite();
  } catch(err) {
      console.log(err);
    }
};

// fetchData();
renderComponentfavorite();
renderComponentSettings();
weatherRequest(localStorage.getItem('query') || 'Minsk'); 