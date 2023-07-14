import { renderFoundData } from "./utils.mjs"

function weatherTemplateFunc() {
    const weatherTemplateElement = 
    `<ul class="contentUL">
        <li class="contentLI">
            <img src="../images/placeholder100x100.png" alt="FILLER ALT" id="weatherImg">
        </li>
        <li class="contentLI" id="weatherCity">FILLER CITY</li>
        <li class="contentLI" id="weatherTemp">FILLER TEMP</li>
        <li class="contentLI" id="weatherType">FILLER TYPE</li>
        <li class="contentLI">High: <span id="weatherTempHigh">FILLER</span> | Low: <span id="weatherTempLow">FILLER</span></li>
    </ul>

    <ul class="contentUL">
        <li class="contentLI">Wind: <span id="weatherWind">FILLER</span></li>
        <li class="contentLI">Humidity: <span id="weatherHumidity">FILLER</span></li>
        <li class="contentLI">Sunrise: <span id="weatherSunrise">FILLER</span></li>
        <li class="contentLI">Sunset: <span id="weatherSunset">FILLER</span></li>
        <li class="contentLI" id="weatherTime">FILLER TIME</li>
    </ul>

    <button class="saveDataBtn">Save This Data</button>
    <p>Weather data acquired from <a href="https://openweathermap.org/" class="apiCredit">OpenWeather API</a></p>`
    
    return weatherTemplateElement
}

let weatherTemplate = weatherTemplateFunc();
renderFoundData(weatherTemplate, ".contentBox");