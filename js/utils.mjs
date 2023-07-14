export function renderWithTemplate(template, parentIDClass, position = "afterbegin") {
        const parentLocation = document.querySelector(parentIDClass);
        parentLocation.insertAdjacentHTML(position, template);
    }