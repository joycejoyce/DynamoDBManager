function ConfirmView() {
    const confirmPage = ConfirmView.get();
    
    this.addEventListeners = () => {
        listenOnNoBtn();
    };
    
    function listenOnNoBtn() {
        const noBtn = confirmPage.querySelector("button.no");
        noBtn.addEventListener("click", () => {
            ConfirmView.reset();
        });
    }
}

ConfirmView.get = () => {
    return document.querySelector(".confirm-container");
}

ConfirmView.reset = () => {
    const confirmPage = ConfirmView.get();
    hide(confirmPage);
    removeId(confirmPage);
}

function hide(elem) {
    elem.style.display = "none";
}

function removeId(elem) {
    elem.id = "";
}

export {
    ConfirmView
};