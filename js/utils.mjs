export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function renderWithTemplate(callLocation, template, parentIDClass, position = "afterbegin") {
    console.log(`Entered ${callLocation} renderWithTemplate`);
    const parentLocation = document.querySelector(parentIDClass);
    if (parentLocation.innerHTML == "") {
        parentLocation.insertAdjacentHTML(position, template);
        console.log(`${callLocation} Template rendered`)
    } else {
        console.log(`Entered ${callLocation} renderWithTemplate clear parentLocation`);
        // This else statement runs if parentLocation already has content (e.g. findInfoBtn was already pressed) & it deletes that content, then fills it with new content. This prevents parentLocation from stacking multiple instances of content, whereas we only want one instance at a time.
        parentLocation.innerHTML = "";
        console.log(`${callLocation} renderWithTemplate parentLocation cleared`);
        parentLocation.insertAdjacentHTML(position, template);
        console.log(`${callLocation} Template rendered`)
        console.log(`Finished ${callLocation} renderWithTemplate clear parentLocation`);
    }
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
            saveDataBtn.innerText = `Data Saved! Press "Find My Location" to get new data`; 
            document.getElementById("active").removeEventListener("click", saveTemplateVariable)
            saveDataBtn.id = "inactive";
        }
        document.getElementById("active").addEventListener("click", saveTemplateVariable)
    }, 3000)
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