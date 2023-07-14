import { renderFoundData } from "./utils.mjs"

function realTimeTemplateFunc() {
    const realTimeTemplateElement = 
    `<ul class="contentUL">
        <li class="contentLI">Latitude: <span id="realTimeLatitude">FILLER</span></li>
        <li class="contentLI">Longitude: <span id="realTimeLongitude">FILLER</span></li>
        <li class="contentLI"><span id="realTimeHeading">Heading: </span>FILLER</li>
        <li class="contentLI"><span id="realTimeSpeed">Speed: </span>FILLER</li>
        <li class="contentLI" id="realTimeLocation">FILLER LOCATION</li>
        <li class="contentLI" id="realTimeTime">FILLER TIME</li>
    </ul>

    <section class="compassBox">
        <!-- <img src="../images/placeholder100x100.png" alt="North Marker | FILLER CREDIT" id="northMarker"> -->
        <img src="../images/compass_logo.png" alt="Compass | FILLER CREDIT" id="compassIcon">
    </section>

    <button class="saveDataBtn">Save This Data</button>
    <p>Location data acquired from <a href="https://www.w3.org/TR/geolocation/" class="apiCredit">Geolocation API</a></p>`
    
    return realTimeTemplateElement
}

let realTimeTemplate = realTimeTemplateFunc();
renderFoundData(realTimeTemplate, ".contentBox");