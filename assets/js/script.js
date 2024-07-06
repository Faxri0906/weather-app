const changeColorBtn = document.querySelector('#color');
const changeBgColorBtn = document.querySelector('#background-color');
const weatherForm = document.forms.weatherForm;
const temperature = document.querySelector('#temperature');
const city = document.querySelector('#city');
const time = document.querySelector('#time');
const pressure = document.querySelector('#pressure');
const wind = document.querySelector('#wind');
const temp_info = document.querySelector('#temp_info');
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(weatherForm);
    const cityName = formData.get("city");
    console.log(cityName);
    getData(cityName);
});
const getData = async (cityName = "Baku") => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd28d425e47mshc89647d5c76e035p1789fdjsnba6dd4eb8fd0',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    const result = await fetch(url, options).then((res) => res.json());
    console.log(result);
    const {location: {name, localtime}, current: {temp_c , feelslike_c , pressure_mb , wind_kph , wind_dir},} = result;
    console.log(name);
    const cityTime = localtime.slice(11);
    const windDirectionMapping = {
        "N": "north",
        "NNE": "north-northeast",
        "NE": "northeast",
        "ENE": "east-northeast",
        "E": "east",
        "ESE": "east-southeast",
        "SE": "southeast",
        "SSE": "south-southeast",
        "S": "south",
        "SSW": "south-southwest",
        "SW": "southwest",
        "WSW": "west-southwest",
        "W": "west",
        "WNW": "west-northwest",
        "NW": "northwest",
        "NNW": "north-northwest",
    };
    time.innerText = `Time: ${cityTime}`;
    city.innerText = `City: ${name}`;
    temp_info.innerText = `${temp_c}° - feels like ${feelslike_c}°`;
    pressure.innerText = `${pressure_mb} mm Hg`;
    windPerSecond = (wind_kph * 1000) / 3600;
    wind.innerText = `${Math.round(windPerSecond)} m/s ${windDirectionMapping[wind_dir]} - light wind`;
    temperature.innerText = `${Math.round(temp_c)}°`;
}
getData();
changeColorBtn.addEventListener('click', () => {
    document.body.style.color = prompt('Choose color');
});
changeBgColorBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = prompt('Choose background-color');
});