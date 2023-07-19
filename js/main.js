import { renderWithTemplate } from "./utils.mjs";

if (!navigator.geolocation) {
    alert("Geolocation not available. Please try again later, or try again with a different device.")
}

function headerTemplateFunc(linkPath, imagePath) {
    const headerTemplateElement = 
    `<a href="${linkPath}" class="logoBox">
        <img src="${imagePath}" alt="Compass Logo">
        <h1>Where Am I? - Geolocator & Weather</h1>
    </a>

    <nav id="navbar">

        <button id="hamburgerBtn">
            <!-- Hamburger Menu Closed Icon -->
            <span>&#9776;</span>
            <!-- X Menu Opened Icon -->
            <span>X</span>
        </button>

        <ul id="headerNav">
            <li><a href="../index.html">Home</a></li>
            <li><a href="../current_location/index.html">Current Location</a></li>
            <li><a href="../real_time_location/index.html">Real Time Location</a></li>
            <li><a href="../weather/index.html">Weather</a></li>
            <li><a href="../saved_data/index.html">Saved Data</a></li>
        </ul>

    </nav>`;

    return headerTemplateElement;
}

let homeHeaderTemplate = headerTemplateFunc(`./index.html`, `./images/compass_logo.webp`);
let otherHeaderTemplate = headerTemplateFunc(`../index.html`, `../images/compass_logo.webp`);
if (document.querySelector("#homeHeader")){
    renderWithTemplate("Header", homeHeaderTemplate, "#homeHeader")
} else {
    renderWithTemplate("Header", otherHeaderTemplate, ".header")
}
function toggleMenu() {
    document.getElementById("headerNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
    document.getElementById("navbar").classList.toggle("open");
}

const xBtn = document.getElementById("hamburgerBtn");
xBtn.addEventListener("click", toggleMenu);