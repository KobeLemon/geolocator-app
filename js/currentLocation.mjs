import { renderWithTemplate, currentDate } from "./utils.mjs"

const successCallback = (position) => {
    console.log(position)
    const { latitude, longitude } = position.coords;
    let currentLocTemplate = currentLocTemplateFunc(latitude, longitude, currentDate());
    renderWithTemplate(currentLocTemplate, ".contentBox");
}

const errorCallBack = (error) => {
    console.log(error)
}

const findinfoBtn = document.getElementById("findInfoBtn");
findinfoBtn.addEventListener("click", () => {
    console.log(`Entered currentLocation findinfoBtn.addEventListener`);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallBack);
    console.log(`Finished currentLocation findinfoBtn.addEventListener`);
})

function currentLocTemplateFunc(latitude, longitude, date) {
    const currentLocTemplateElement = 
    `<ul class="contentUL">
        <li class="contentLI">Latitude: <span id="staticLatitude">${latitude.toFixed(5)}</span></li>
        <li class="contentLI">Longitude: <span id="staticLongitude">${longitude.toFixed(5)}</span></li>
        <li class="contentLI" id="staticLocation">FILLER LOCATION</li>
        <li class="contentLI" id="staticTime">${date}</li>
    </ul>

    <a href="#">
        <img src="../images/map_icon.png" alt="Link to a Map | FILLER ALT" id="mapIcon">
    </a>

    <button class="saveDataBtn">Save This Data</button>
    <p>Location data acquired from <a href="https://www.w3.org/TR/geolocation/" class="apiCredit">Geolocation API</a></p>`
    
    return currentLocTemplateElement
}

// let currentLocTemplate = currentLocTemplateFunc();
// renderFoundData(currentLocTemplate, ".contentBox");