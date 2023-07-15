import { renderWithTemplate, currentDate, getCityInfo } from "./utils.mjs"

async function successCallback(position) {
    console.log(position)
    const { latitude, longitude } = position.coords;
    console.log(`latitude: ${latitude}`);
    console.log(`longitude: ${longitude}`);
    // These are used if I need to look for a hard coded location, rather than my current location.
    // latitude = "61.53805438734129";
    // longitude = "82.39069917161981";
    let locationRequest = await getCityInfo(latitude, longitude);
    console.log(locationRequest);
    let cityCountryInfo = `${locationRequest[0].City}, ${locationRequest[0].Country}`;
    console.log(cityCountryInfo);
    let currentLocTemplate = currentLocTemplateFunc(latitude, longitude, cityCountryInfo, currentDate());
    renderWithTemplate(currentLocTemplate, ".contentBox");
}

const errorCallBack = (error) => {
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
    console.log(`Finished currentLocation findinfoBtn.addEventListener`);
})

function currentLocTemplateFunc(latitude, longitude, cityCountry, date) {
    const currentLocTemplateElement = 
    `<ul class="contentUL">
        <li class="contentLI"><strong>Latitude:</strong> <span id="staticLatitude">${latitude.toFixed(5)}</span></li>
        <li class="contentLI"><strong>Longitude:</strong> <span id="staticLongitude">${longitude.toFixed(5)}</span></li>
        <li class="contentLI" id="staticLocation">${cityCountry}</li>
        <li class="contentLI" id="staticTime">${date}</li>
    </ul>

    <a href="http://www.google.com/maps/place/${latitude},${longitude}" target="_blank">
        <img src="../images/map_icon.png" alt="Link to a Map | FILLER ALT" id="mapIcon">
    </a>

    <button class="saveDataBtn">Save This Data</button>
    <p>Location data acquired from <a href="https://www.w3.org/TR/geolocation/" class="apiCredit">Geolocation API</a></p>`
    
    return currentLocTemplateElement
}