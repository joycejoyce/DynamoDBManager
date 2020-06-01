import React from "react";
import ReactDOM from "react-dom";
import {Util} from "../common-components/util.js";
import {IconElem} from "../common-components/icon-elem.js";

function CollapsibleView() {}

CollapsibleView.className = {
    collapsible: "collapsible",
    btn: "collapsible-btn",
    contents: "collapsible-contents"
};

CollapsibleView.getCollapsibleDoc = () => {
    const btn = CollapsibleView.getBtnDoc();
    const contents = CollapsibleView.getContentsDoc();
    const collapsible = document.createElement("div");
    collapsible.className = CollapsibleView.className.collapsible;
    collapsible.appendChild(btn);
    collapsible.appendChild(contents);
    
    return collapsible;
};

CollapsibleView.getBtnDoc = () => {
    const icon = getInitIconDoc();
    const btn = document.createElement("button");
    btn.className = CollapsibleView.className.btn;
    btn.append(icon);
    
    return btn;
}

function getInitIconDoc() {
    const icon = IconElem.get(IconElem.elem.DOWN);
    return icon;
}

CollapsibleView.getContentsDoc = () => {
    return(
        <div className="contents"></div>
    );
};

CollapsibleView.listenOnClickBtn = (collapsible) => {
    const btn = collapsible.querySelector("."+CollapsibleView.className.btn);
    const contents = collapsible.querySelector("."+CollapsibleView.className.contents);
    btn.addEventListener("click", () => {
        toggleContentsMaxHeight(contents);
        toggleIconByContentsMaxHeight(btn.querySelector("i"), contents.style.maxHeight);
    });
};

function toggleContentsMaxHeight(contents) {
    if(contents.style.maxHeight) {
        contents.style.maxHeight = null;
    }
    else {
        //contents.style.maxHeight = contents.scrollHeight + "px";
        contents.style.maxHeight = "60vh";
        contents.style.overflow = "auto";
    }
}

function toggleIconByContentsMaxHeight(icon, maxHeight) {
    icon.className = IconElem.elem.BASIC;
    if(maxHeight) {
        icon.classList.add(IconElem.elem.UP);
    }
    else {
        icon.classList.add(IconElem.elem.DOWN);
    }
    
    return icon.className;
}

export {
    CollapsibleView
};