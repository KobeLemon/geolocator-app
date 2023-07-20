import * as utilsModule from "./utils.mjs"

let callLocation = "";

const contentBoxElem = document.querySelector(".contentBox");

async function successCallback(position) {
    // console.log(position)
    const { latitude, longitude } = position.coords;
    // console.log(`latitude: ${latitude}`);
    // console.log(`longitude: ${longitude}`);
    let url = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${latitude}&lon=${longitude}&appid=659d1abc1a1e9d987421cfc8b88e65fc`;
    let data = await utilsModule.apiFetch(url);
    let argArray = getAPIInfo(data);
    let weatherTemplate = weatherTemplateFunc(argArray);
    setTimeout(() => {
        utilsModule.renderWithTemplate(weatherTemplate, ".contentBox", callLocation = "Weather");
        contentBoxElem.scrollIntoView({behavior: "smooth", block: "end", inline: "center"});
    }, 1000);
}

function errorCallBack(error) {
    // console.log(error);
    if (error.code === 1) {
        alert("Sorry, Location Access is required to use this site. \nPlease reset your location permissions, then refresh the page & allow location access.");
    } else {
        alert("Position unavailable");
    }
}

const findinfoBtn = document.getElementById("findInfoBtn");
findinfoBtn.addEventListener("click", () => {
    // console.log(`Entered Weather findinfoBtn.addEventListener`);
    contentBoxElem.innerHTML = `<h2 id="loading">Retrieving New Data...</h2>`
    contentBoxElem.scrollIntoView({behavior: "smooth", block: "end", inline: "center"});
    navigator.geolocation.getCurrentPosition(successCallback, errorCallBack);
    document.querySelector(".saveDataBtn").innerText = `Save This Data`
    utilsModule.saveTemplate(".contentBox", "weather");
    // console.log(`Finished Weather findinfoBtn.addEventListener`);
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
        <li>
            <img src="${argArray.icon}" alt="${argArray.description}" class="weatherImg">
        </li>
        <li>${argArray.location}</li>
        <li>${argArray.tempCurrent}</li>
        <li>${argArray.description}</li>
        <li><strong>High:</strong> <span>${argArray.tempHigh}</span> | <strong>Low:</strong> <span>${argArray.tempLow}</span></li>
    </ul>

    <ul class="contentUL" id="weatherBox2">
        <li><strong>Wind:</strong> <span>${argArray.windspeed}</span></li>
        <li><strong>Humidity:</strong> <span>${argArray.humidity}</span></li>
        <li><strong>Sunrise:</strong> <span>${argArray.sunrise}</span></li>
        <li><strong>Sunset:</strong> <span>${argArray.sunset}</span></li>
        <li>${argArray.time}</li>
    </ul>

    <p class="apiBox">Weather data acquired from <a href="https://openweathermap.org/" class="apiCredit" target="_blank">OpenWeather API</a></p>`
    
    return weatherTemplateElement;
}