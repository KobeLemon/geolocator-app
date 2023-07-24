export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export async function geoSuccessCallback(coords, contentBoxElem, templateName, templateFunc, callLocation = "No callLocation given") {
    console.log(`Entered ${callLocation} geoSuccessCallback`);

    contentBoxElem.innerHTML = `<h2 id="loading">Retrieving New Data...</h2>`;

    let { latitude, longitude } = coords;
    console.log(`latitude: ${latitude}`);
    console.log(`longitude: ${longitude}`);

    let url = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${latitude}&lon=${longitude}&appid=659d1abc1a1e9d987421cfc8b88e65fc`;
    let data = await apiFetch(url);
    let argArray = getAPIInfo(data, latitude, longitude);
    let infoTemplate = templateFunc(argArray);
    
    setTimeout(() => {
        renderWithTemplate(infoTemplate, ".contentBox", callLocation);
        contentBoxElem.scrollIntoView({behavior: "smooth", block: "end", inline: "center"});
        document.querySelector(".saveDataBtn").innerText = `Save This Data`;
        saveTemplate(".contentBox", templateName);
    }, 1000);
    console.log(`Finished ${callLocation} geoSuccessCallback`);
}

export function geoErrorCallBack(error) {
    // console.log(error);
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Sorry, Location Access is required to use this site. \nPlease reset your location permissions, then refresh the page & allow location access.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable. Please try again.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out. Please try again.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred. Please try again.")
            break;
    }
}

// callLocation is the parent element where the template is inserted. Ex. Header, currentLocation, or Weather
export function renderWithTemplate(template, parentIDClass, callLocation = "No callLocation given", position = "afterbegin") {
    console.log(`Entered ${callLocation} renderWithTemplate ${parentIDClass}`);
    if (!parentIDClass) {
        alert(`${callLocation} renderWithTemplate Wrong Id or Class: ${parentIDClass}`);
    }
    const parentLocation = document.querySelector(parentIDClass);

    parentLocation.innerHTML = "";
    console.log(`${callLocation} renderWithTemplate parentLocation cleared`);

    parentLocation.insertAdjacentHTML(position, template);
    console.log(`${callLocation} Template rendered`)
    console.log(`${callLocation} Finished renderWithTemplate`);
}

export function saveTemplate(parent, key) {
    const saveDataBtn = document.querySelector(".saveDataBtn");
    const parentElem = document.querySelector(parent);
    saveDataBtn.id = "active";
    setTimeout(() => {
        console.log("saveDataBtn Ready")
        const saveTemplateVariable = () => {
            console.log(parentElem.innerHTML);
            console.log(`key: ${key}`);
            let templateArray = getLocalStorage(key);
            if (!templateArray) {
                templateArray = [];
                templateArray.push(parentElem.innerHTML);
                setLocalStorage(key, templateArray);
            } else {
                templateArray.push(parentElem.innerHTML);
                setLocalStorage(key, templateArray);
            }
            console.log(templateArray)
            saveDataBtn.innerText = `Data Saved! Press "Find My Data" to get new data`; 
            document.getElementById("active").removeEventListener("click", saveTemplateVariable)
            saveDataBtn.id = "inactive";
        }
        document.getElementById("active").addEventListener("click", saveTemplateVariable)
    }, 1000)
}

export async function apiFetch(url){
    try{
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            return data;
        }else{
            throw Error(await response.text());
        }
    }catch (error){
        console.log(error);
}}

export function getAPIInfo(weatherData, latitude, longitude, index = 0) {
    let resultsArray = {
        lat: latitude,
        lon: longitude,
        icon: `https://openweathermap.org/img/w/${weatherData.list[index].weather[0].icon}.png`,
        description: capitalizeSentence(weatherData.list[index].weather[0].description),
        location: `${weatherData.city.name}, ${weatherData.city.country}`,
        tempCurrent: `${weatherData.list[index].main.temp}° F`,
        tempHigh: `${weatherData.list[index].main.temp_max}° F`,
        tempLow: `${weatherData.list[index].main.temp_min}° F`,
        windspeed: `${weatherData.list[index].wind.speed} mph`,
        humidity: `${weatherData.list[index].main.humidity}%`,
        sunrise: formatUnixDate(weatherData.city.sunrise),
        sunset: formatUnixDate(weatherData.city.sunset),
        time: currentDate(),
    }
    
    // console.log(weatherData);
    // console.log(`latitude: ${resultsArray.lat}`);
    // console.log(`longitude: ${resultsArray.lon}`);
    // console.log(`iconSRC: ${resultsArray.icon}`);
    // console.log(`description: ${resultsArray.description}`);
    // console.log(`location: ${resultsArray.location}`);
    // console.log(`tempCurrent: ${resultsArray.tempCurrent}`);
    // console.log(`tempHigh: ${resultsArray.tempHigh}`);
    // console.log(`tempLow: ${resultsArray.tempLow}`);
    // console.log(`windspeed: ${resultsArray.windspeed}`);
    // console.log(`humidity: ${resultsArray.humidity}`);
    // console.log(`sunrise: ${resultsArray.sunrise}`);
    // console.log(`sunset: ${resultsArray.sunset}`);
    // console.log(`time: ${resultsArray.time}`);
    // console.log(resultsArray);

    return resultsArray;
}

export function currentDate(dateType = "full", timeType = "long") {
    let today = new Date();
    let dateTime = new Intl.DateTimeFormat("en-US", {
        dateStyle: dateType,
        timeStyle: timeType
    })
    let currentDateTime = dateTime.format(today);
    return currentDateTime;
}

export function formatUnixDate(time){
    let dateObj = new Date(time * 1000);
    let hours = dateObj.getHours().toString().padStart(2,0);
    let minutes = dateObj.getMinutes().toString().padStart(2,0);
    let suffix = "";
    if (hours >=0 && hours <= 11) {
        suffix = "AM";
    } else if (hours >= 12 && hours <= 23) {
        suffix = "PM";
    } else {
        alert("Invalid Date");
    }
    let formattedDateTime = `${hours}:${minutes} ${suffix}`;
    return formattedDateTime;
}

export function capitalizeSentence(sentence) {
    let string = sentence.split(' ');
    let newString = []
    string.forEach(item =>{
        let itemSplit = item.split('');
        itemSplit[0] = itemSplit[0].toUpperCase();
        let itemJoin = itemSplit.join('')
        newString.push(itemJoin)
    })
    return newString = newString.join(' ');
}