import { renderFoundData } from "./utils.mjs"

function currentLocTemplateFunc() {
    const currentLocTemplateElement = 
    `<ul class="contentUL">
        <li class="contentLI">Latitude: <span id="staticLatitude">FILLER</span></li>
        <li class="contentLI">Longitude: <span id="staticLongitude">FILLER</span></li>
        <li class="contentLI" id="staticLocation">FILLER LOCATION</li>
        <li class="contentLI" id="staticTime">FILLER TIME</li>
    </ul>

    <a href="#">
        <img src="../images/map_icon.png" alt="Link to a Map | FILLER ALT" id="mapIcon">
    </a>

    <button class="saveDataBtn">Save This Data</button>
    <p>Location data acquired from <a href="https://www.w3.org/TR/geolocation/" class="apiCredit">Geolocation API</a></p>`
    
    return currentLocTemplateElement
}

let currentLocTemplate = currentLocTemplateFunc();
renderFoundData(currentLocTemplate, ".contentBox");