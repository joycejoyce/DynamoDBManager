function FontAwesomeUtil() {
    this.createElements = () => {
        const addAttrBtn = document.querySelector("#add-attr-ctrl-item-btn");
        addAttrBtn.appendChild(FontAwesomeUtil.getPlusSign());
    };
}

FontAwesomeUtil.getPlusSign = () => {
    const elem = document.createElement("i");
    elem.className = "fa fa-plus";
    return elem;
};

export {
    FontAwesomeUtil
};