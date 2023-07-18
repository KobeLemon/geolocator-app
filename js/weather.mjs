import { renderWithTemplate, currentDate, capitalizeSentence, formatUnixDate } from "./utils.mjs"

async function successCallback(position) {
    console.log(position)
    const { latitude, longitude } = position.coords;
    console.log(`latitude: ${latitude}`);
    console.log(`longitude: ${longitude}`);
    let url = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${latitude}&lon=${longitude}&appid=659d1abc1a1e9d987421cfc8b88e65fc`;
    let data = await apiFetch(url);
    const argArray = getAPIInfo(data);
    let weatherTemplate = weatherTemplateFunc(argArray);
    renderWithTemplate(weatherTemplate, ".contentBox");
}

function errorCallBack(error) {
    console.log(error);
    if (error.code === 1) {
        alert("Sorry, Location Access is required to use this site. \nPlease reset your location permissions, then refresh the page & allow location access.");
    } else {
        alert("Position unavailable");
    }
}

const findinfoBtn = document.getElementById("findInfoBtn");
findinfoBtn.addEventListener("click", () => {
    console.log(`Entered Weather findinfoBtn.addEventListener`);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallBack);
    console.log(`Finished Weather findinfoBtn.addEventListener`);
})

async function apiFetch(url){
    try{
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            return data;
        }else{
            throw Error(await response.text());
        }
    }catch (error){
        console.log(error);
    }}

function getAPIInfo(weatherData, index = 0) {

    let city = weatherData.city.name;
    let country = weatherData.city.country;
    let rawSunrise = weatherData.city.sunrise;
    let rawSunset = weatherData.city.sunset;
    let formatSunrise = formatUnixDate(rawSunrise);
    console.log(`formatSunrise: ${formatSunrise}`);
    let formatSunset = formatUnixDate(rawSunset);
    console.log(`formatSunset: ${formatSunset}`);
    
    let resultsArray = {
        icon: `https://openweathermap.org/img/w/${weatherData.list[index].weather[0].icon}.png`,
        description: capitalizeSentence(weatherData.list[index].weather[0].description),
        location: `${city}, ${country}`,
        tempCurrent: `${weatherData.list[index].main.temp}° F`,
        tempHigh: `${weatherData.list[index].main.temp_max}° F`,
        tempLow: `${weatherData.list[index].main.temp_min}° F`,
        windspeed: `${weatherData.list[index].wind.speed} mph`,
        humidity: `${weatherData.list[index].main.humidity}%`,
        sunrise: formatUnixDate(weatherData.city.sunrise),
        sunset: formatUnixDate(weatherData.city.sunset),
        time: currentDate(),
    }
    // console.log(weatherData);
    // console.log(`iconSRC: ${resultsArray.icon}`);
    // console.log(`description: ${resultsArray.description}`);
    // console.log(`location: ${resultsArray.location}`);
    // console.log(`tempCurrent: ${resultsArray.tempCurrent}`);
    // console.log(`tempHigh: ${resultsArray.tempHigh}`);
    // console.log(`tempLow: ${resultsArray.tempLow}`);
    // console.log(`windspeed: ${resultsArray.windspeed}`);
    // console.log(`humidity: ${resultsArray.humidity}`);
    // console.log(`sunrise: ${resultsArray.sunrise}`);
    // console.log(`sunset: ${resultsArray.sunset}`);
    // console.log(`time: ${resultsArray.time}`);

    return resultsArray;
}

function weatherTemplateFunc(argArray) {
    let args = argArray 
    const weatherTemplateElement =
    `<ul class="contentUL">
        <li class="contentLI">
            <img src="${args.icon}" alt="${args.description}" id="weatherImg">
        </li>
        <li class="contentLI" id="weatherCity">${args.location}</li>
        <li class="contentLI" id="weatherTemp">${args.tempCurrent}</li>
        <li class="contentLI" id="weatherType">${args.description}</li>
        <li class="contentLI">High: <span id="weatherTempHigh">${args.tempHigh}</span> | Low: <span id="weatherTempLow">${args.tempLow}</span></li>
    </ul>

    <ul id="weatherBox2"class="contentUL">
        <li class="contentLI">Wind: <span id="weatherWind">${args.windspeed}</span></li>
        <li class="contentLI">Humidity: <span id="weatherHumidity">${args.humidity}</span></li>
        <li class="contentLI">Sunrise: <span id="weatherSunrise">${args.sunrise}</span></li>
        <li class="contentLI">Sunset: <span id="weatherSunset">${args.sunset}</span></li>
        <li class="contentLI" id="weatherTime">${args.time}</li>
    </ul>

    <button class="saveDataBtn">Save This Data</button>
    <p>Weather data acquired from <a href="https://openweathermap.org/" class="apiCredit">OpenWeather API</a></p>`
    
    return weatherTemplateElement;
}