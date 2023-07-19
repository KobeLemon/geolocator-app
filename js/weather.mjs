import * as utilsModule from "./utils.mjs"

async function successCallback(position) {
    console.log(position)
    const { latitude, longitude } = position.coords;
    console.log(`latitude: ${latitude}`);
    console.log(`longitude: ${longitude}`);
    let url = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${latitude}&lon=${longitude}&appid=659d1abc1a1e9d987421cfc8b88e65fc`;
    let data = await utilsModule.apiFetch(url);
    let argArray = getAPIInfo(data);
    let weatherTemplate = weatherTemplateFunc(argArray);
    utilsModule.renderWithTemplate("Weather", weatherTemplate, ".contentBox");
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
    utilsModule.saveTemplate(".contentBox", "weather");
    console.log(`Finished Weather findinfoBtn.addEventListener`);
})

function getAPIInfo(weatherData, index = 0) {    
    let resultsArray = {
        icon: `https://openweathermap.org/img/w/${weatherData.list[index].weather[0].icon}.png`,
        description: utilsModule.capitalizeSentence(weatherData.list[index].weather[0].description),
        location: `${weatherData.city.name}, ${weatherData.city.country}`,
        tempCurrent: `${weatherData.list[index].main.temp}° F`,
        tempHigh: `${weatherData.list[index].main.temp_max}° F`,
        tempLow: `${weatherData.list[index].main.temp_min}° F`,
        windspeed: `${weatherData.list[index].wind.speed} mph`,
        humidity: `${weatherData.list[index].main.humidity}%`,
        sunrise: utilsModule.formatUnixDate(weatherData.city.sunrise),
        sunset: utilsModule.formatUnixDate(weatherData.city.sunset),
        time: utilsModule.currentDate(),
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
    const weatherTemplateElement =
    `<ul class="contentUL">
        <li class="contentLI">
            <img src="${argArray.icon}" alt="${argArray.description}" id="weatherImg">
        </li>
        <li class="contentLI" id="weatherCity">${argArray.location}</li>
        <li class="contentLI" id="weatherTemp">${argArray.tempCurrent}</li>
        <li class="contentLI" id="weatherType">${argArray.description}</li>
        <li class="contentLI"><strong>High:</strong> <span id="weatherTempHigh">${argArray.tempHigh}</span> | <strong>Low:</strong> <span id="weatherTempLow">${argArray.tempLow}</span></li>
    </ul>

    <ul id="weatherBox2"class="contentUL">
        <li class="contentLI"><strong>Wind:</strong> <span id="weatherWind">${argArray.windspeed}</span></li>
        <li class="contentLI"><strong>Humidity:</strong> <span id="weatherHumidity">${argArray.humidity}</span></li>
        <li class="contentLI"><strong>Sunrise:</strong> <span id="weatherSunrise">${argArray.sunrise}</span></li>
        <li class="contentLI"><strong>Sunset:</strong> <span id="weatherSunset">${argArray.sunset}</span></li>
        <li class="contentLI" id="weatherTime">${argArray.time}</li>
    </ul>

    <button class="saveDataBtn">Save This Data</button>
    <p>Weather data acquired from <a href="https://openweathermap.org/" class="apiCredit">OpenWeather API</a></p>`
    
    return weatherTemplateElement;
}