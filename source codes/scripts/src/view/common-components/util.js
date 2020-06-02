function Util() {}

Util.showOrHideElement = (elem) => {
    const display = Util.getComputedPropertyValue(elem, "display");

    if(display == "none") {
        elem.style.display = "block";
    }
    else {
        elem.style.display = "none";
    }
};

Util.getComputedPropertyValue = (elem, property) => {
    return window.getComputedStyle(elem).getPropertyValue(property);
};

Util.toggleElemMaxHeight = (elem) => {
    if(elem.style.maxHeight) {
        elem.style.maxHeight = null;
        elem.style.overflow = "hidden";
    }
    else {
        /*elem.style.maxHeight = elem.scrollHeight + "px";
        elem.style.overflow = "visible";*/
        elem.style.maxHeight = "60vh";
        elem.style.overflow = "hidden";
    }
}

Util.changeIElem = (iElem) => {
    const classDown = "fa-caret-down";
    const classUp = "fa-caret-up";
    if(iElem.classList.contains(classDown)) {
        iElem.classList.remove(classDown);
        iElem.classList.add(classUp);
    }
    else if(iElem.classList.contains(classUp)) {
        iElem.classList.remove(classUp);
        iElem.classList.add(classDown);
    }
};

Util.getDistinctValues = (ary) => {
    const distinctValues = ary.reduce((result, item) => {
        if(!result.includes(item)) {
            result.push(item);
        }
        return result;
    }, []);

    return distinctValues;
};

export {
    Util
};