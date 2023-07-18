

export function renderWithTemplate(template, parentIDClass, position = "afterbegin") {
    console.log(`Entered renderWithTemplate`);
    const parentLocation = document.querySelector(parentIDClass);
    if (parentLocation.innerHTML == "") {
        parentLocation.insertAdjacentHTML(position, template);
    } else {
        // This else statement runs if parentLocation already has content (e.g. findInfoBtn was already pressed) & it deletes that content, then fills it with new content. This prevents parentLocation from stacking multiple instances of content, whereas we only want one instance at a time.
        parentLocation.innerHTML = "";
        parentLocation.insertAdjacentHTML(position, template);
    }
    console.log(`Finished renderWithTemplate`);
}

export function currentDate() {
    let today = new Date();
    let dateTime = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "long"
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

export async function getCityInfo(latitude, longitude) {
    // These are used if I need to look for a hard coded location, rather than my current location.
    // latitude = "61.53805438734129";
    // longitude = "82.39069917161981";
    const url = `https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=${latitude}&longitude=${longitude}&range=0`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5fdb5ad4cdmshdeedbcc5d39397cp139286jsnb517a605abcb',
            'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
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