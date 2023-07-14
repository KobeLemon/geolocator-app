export function renderWithTemplate(template, parentIDClass, position = "afterbegin") {
    console.log(`Entered renderWithTemplate`);
    const parentLocation = document.querySelector(parentIDClass);
    if (parentLocation.innerHTML == "") {
        parentLocation.insertAdjacentHTML(position, template);
    } else {
        // This else statement runs if parentLocation already has content (ex. findInfoBtn was already pressed) & it deletes that content, then fills it with new content. This prevents parentLocation from stacking with many instances of content, whereas we only want one instance at a time.
        parentLocation.innerHTML = "";
        parentLocation.insertAdjacentHTML(position, template);
    }
    console.log(`Finished renderWithTemplate`);
}

export function renderFoundData(template, parentIDClass) {
    console.log(`Entered renderFoundData`);
    const findinfoBtn = document.getElementById("findInfoBtn");
    findinfoBtn.addEventListener("click", () => {
        console.log(`Entered findinfoBtn.addEventListener`);
        renderWithTemplate(template, parentIDClass)
        console.log(`Finished findinfoBtn.addEventListener`);
    })
    console.log(`Finished renderFoundData`);
}