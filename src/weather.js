import clearimg from './assets/clear.png';
import snowimg from './assets/snow.png';
import cloudimg from './assets/cloud.png';
import mistimg from './assets/mist.png';
import rainimg from './assets/rain.png';
import error404img from './assets/404.png';

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => resolve(`lat=${position.coords.latitude}&lon=${position.coords.longitude}`));
    }
  });
}

async function wther(locate){
    const weathercont = document.querySelector(".weather-cont");
    const weatherdetails = document.querySelector(".weather-details");
    const error404 = document.querySelector(".not-found");
    const app = document.querySelector('.App');
    const api_key='334b9630a83366a3a38b39aa58e7390d';
    const location = document.querySelector(".getcity-input");
    let city = 'q=' + location.value;

    if(locate){
        city = await getLocation();
        location.value = 'Current Location';
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
    .then(response=>response.json())
    .then(json=>{
        if (json.cod==='404'){
            error404.style.visibility = 'visible';
            error404.classList.add('Fadin');
            app.style.height = '300px';
            error404.style.display = 'block';
            weathercont.style.display = 'none';
            weatherdetails.style.display = 'none';
            return;
        }
        else if(json.cod==='400'){
            console.log(console.clear());
            return;
        }
        else{
            error404.classList.remove('Fadin');
            error404.style.display = 'none';
            weathercont.style.display = 'block';
            weatherdetails.style.display = 'flex';
            
            const weatherimg = document.querySelector(".clear-sky");
            const temp = document.querySelector(".Temp");
            const des = document.querySelector(".Des");
            const humidity = document.querySelector(".h-details span");
            const wind = document.querySelector(".w-details span");

            switch (json.weather[0].main) {
                case 'Clear':
                    weatherimg.classList.add('romtamte');
                    weatherimg.src = clearimg;
                    break;
                case 'Snow':
                    weatherimg.classList.remove('romtamte');
                    weatherimg.src = snowimg;
                    break;
                case 'Rain':
                    weatherimg.classList.remove('romtamte');
                    weatherimg.src = rainimg;
                    break;
                case 'Haze':
                    weatherimg.classList.remove('romtamte');
                    weatherimg.src = mistimg;
                    break;
                case 'Clouds':
                    weatherimg.classList.remove('romtamte');
                    weatherimg.src = cloudimg;
                    break;
                default:
                    weatherimg.classList.remove('romtamte');
                    weatherimg.src = error404img;
                    break;
                }
                
                temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                des.innerHTML = `${json.weather[0]["description"]}`;
                humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
                app.style.height = '500px';
            }
        })
    }

document.querySelector(".Locate-icon").addEventListener("click", () => wther(true));
document.querySelector(".getcity-input").addEventListener('keypress',event => {
    if(event.which === 13){
        wther();
        document.querySelector(".getcity-input").blur();
    }
});


export default wther;
