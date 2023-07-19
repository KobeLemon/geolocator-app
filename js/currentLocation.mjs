import * as utilsModule from "./utils.mjs"

async function successCallback(position) {
    console.log(position)
    const { latitude, longitude } = position.coords;
    console.log(`latitude: ${latitude}`);
    console.log(`longitude: ${longitude}`);
    let url = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${latitude}&lon=${longitude}&appid=659d1abc1a1e9d987421cfc8b88e65fc`;
    let weatherData = await utilsModule.apiFetch(url);
    let location = `${weatherData.city.name}, ${weatherData.city.country}`;
    let currentLocTemplate = currentLocTemplateFunc(location, latitude, longitude, utilsModule.currentDate());
    utilsModule.renderWithTemplate("currentLocation", currentLocTemplate, ".contentBox");
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
    console.log(`Entered currentLocation findinfoBtn.addEventListener`);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallBack);
    document.querySelector(".saveDataBtn").innerText = `Save This Data`
    utilsModule.saveTemplate(".contentBox", "currentLocation");
    console.log(`Finished currentLocation findinfoBtn.addEventListener`);
})

function currentLocTemplateFunc(location, lat, lon, date) {
    const currentLocTemplateElement = 
    `<ul class="contentUL">
        <li><strong>Latitude:</strong> <span>${lat.toFixed(5)}</span></li>
        <li><strong>Longitude:</strong> <span>${lon.toFixed(5)}</span></li>
        <li>${location}</li>
        <li>${date}</li>
    </ul>

    <a href="http://www.google.com/maps/place/${lat},${lon}" target="_blank" class="mapLink">
        <img src="../images/map_icon.png" alt="Link to a Map" class="mapIcon">
        <p>Link to a Map ↑</p>
    </a>

    <p class="apiBox">Location data acquired from <a href="https://www.w3.org/TR/geolocation/" class="apiCredit">Geolocation API</a></p>`
    
    return currentLocTemplateElement
}