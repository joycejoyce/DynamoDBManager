import {Util} from "../common-components/util.js";

function CollapsibleView() {}

const CLASS_NAME = {
    collapsible: "collapsible",
    btn: "collapsible-btn",
    contents: "collapsible-btn"
};

const I_ELEM_CLASS_NAME = {
    up: "fas fa-plus",
    down: "fas fa-minus"
};

CollapsibleView.createDoc = () => {
    const btn = getCollapsibleBtn();
    const contents = getCollapsibleContents();
    const collapsible = getCollapsibleDoc();
    collapsible.appendChild(btn);
    collapsible.appendChild(contents);
    
    return collapsible;
};

function getBtnDoc() {
    const iElem = getInitIElemDoc();
    const btn = document.createElement("button");
    btn.className = CLASS_NAME.btn;
    btn.append(iElem);
    
    return btn;
}

function getInitIElemDoc() {
    const iElem = document.createElement("i");
    iElem.className = I_ELEM_CLASS_NAME.down;
    
    return iElem;
}

function getContentsDoc() {
    const contents = document.createElement("div");
    contents.className = CLASS_NAME.contents;
    
    return contents;
}

function getCollapsibleDoc() {
    const collapsible = document.createElement("div");
    collapsible.className = CLASS_NAME.collapsible;
    
    return collapsible;
}

CollapsibleView.listenOnClickBtn = (collapsible) => {
    const btn = collapsible.querySelector(CLASS_NAME.btn);
    const contents = collapsible.querySelector(CLASS_NAME.contents);
    btn.addEventListener("click", () => {
        showOrHideContents(collapsible);
        Util.toggleClasses(contents);
    });
};

function showOrHideContents(collapsible) {
    const contents = collapsible.querySelector(CLASS_NAME.contents);
    const overflow = Util.getComputedPropertyValue(contents, "overflow");
    
}

function getIElem() {
    
}

export {
    CollapsibleView
};