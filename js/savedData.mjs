import { getLocalStorage, renderWithTemplate } from "./utils.mjs";

function renderSavedDataBox(parent, key, noData) {
    let dataBox = getLocalStorage(key);
    console.log(dataBox);
    let parentElem = document.getElementById(parent);
    console.log(parentElem.innerHTML);
    // console.log(noData);
    if (!dataBox) {
        parentElem.innerHTML = noData;
        return
    }
    dataBox.forEach((item) => {
        let li = document.createElement("li");
        li.classList.add("savedDataLI")
        li.innerHTML = item;
        parentElem.append(li);
    })
}

let currentLocNoData = `<p class="noData">No Current Location Data Saved!</p>`
let weatherNoData = `<p class="noData">No Weather Data Saved!</p>`

renderSavedDataBox("savedCurrentLocUL", "currentLocation", currentLocNoData);
renderSavedDataBox("savedWeatherUL", "weather", weatherNoData);