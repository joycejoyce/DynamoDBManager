function IconElem() {}

IconElem.elem = {
    BASIC: "fas",
    UP: "fa-caret-up",
    DOWN: "fa-caret-down",
    PLUS: "fa-plus",
    MINUS: "fa-minus"
};

IconElem.get = (name) => {
    const elem = getBasicIElem();
    elem.classList.add(name);
    return elem;
};

function getBasicIElem() {
    const elem = document.createElement("i");
    elem.classList.add(IconElem.elem.BASIC);
    return elem;
}

export {
    IconElem
};