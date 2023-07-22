import * as utilsModule from "./utils.mjs"

let callLocation = "";

const contentBoxElem = document.querySelector(".contentBox");

function successCallback(position) {
    // console.log(position)
    utilsModule.geoSuccessCallback(position.coords, contentBoxElem, "currentLocation", currentLocTemplateFunc, callLocation = "currentLocation")
}

function errorCallBack(error) {
    utilsModule.geoErrorCallBack(error);
}

const findinfoBtn = document.getElementById("findInfoBtn");
findinfoBtn.addEventListener("click", () => {
    // console.log(`Entered currentLocation findinfoBtn.addEventListener`);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallBack);
    // console.log(`Finished currentLocation findinfoBtn.addEventListener`);
})

function currentLocTemplateFunc(argArray) {
    const currentLocTemplateElement = 
    `<ul class="contentUL">
        <li><strong>Latitude:</strong> <span>${argArray.lat.toFixed(5)}</span></li>
        <li><strong>Longitude:</strong> <span>${argArray.lon.toFixed(5)}</span></li>
        <li>${argArray.location}</li>
        <li>${argArray.time}</li>
    </ul>

    <a href="http://www.google.com/maps/place/${argArray.lat},${argArray.lon}" target="_blank" class="mapLink">
        <img src="../images/map_icon.webp" alt="Link to a Map" class="mapIcon">
        <p>Link to a Map ↑</p>
    </a>

    <p class="apiBox">Location data acquired from <a href="https://www.w3.org/TR/geolocation/" class="apiCredit" target="_blank">Geolocation API</a></p>`
    
    return currentLocTemplateElement
}