import * as utilsModule from "./utils.mjs"

let callLocation = "";

const contentBoxElem = document.querySelector(".contentBox");

function successCallback(position) {
    // console.log(position)
    utilsModule.geoSuccessCallback(position.coords, contentBoxElem, "weather", weatherTemplateFunc, callLocation = "Weather")
}

function errorCallBack(error) {
    utilsModule.geoErrorCallBack(error);
}

const findinfoBtn = document.getElementById("findInfoBtn");
findinfoBtn.addEventListener("click", () => {
    // console.log(`Entered Weather findinfoBtn.addEventListener`);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallBack);
    // console.log(`Finished Weather findinfoBtn.addEventListener`);
})

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