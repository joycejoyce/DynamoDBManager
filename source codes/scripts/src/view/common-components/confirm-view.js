function ConfirmView() {
    const confirmPage = ConfirmView.get();
    
    this.addEventListeners = () => {
        listenOnNoBtn();
        listenOnClickWindow();
    };
    
    function listenOnNoBtn() {
        const noBtn = confirmPage.querySelector("button.no");
        noBtn.addEventListener("click", () => {
            ConfirmView.reset();
        });
    }
    
    function listenOnClickWindow() {
        window.addEventListener("click", (e) => {
            if(e.target == confirmPage) {
                ConfirmView.reset();
            }
        });
    }
}

ConfirmView.create = (id, confirmMsg) => {
    const confirmPage = ConfirmView.get();
    confirmPage.id = id;
    confirmPage.querySelector(".confirm-msg").textContent = confirmMsg;
    confirmPage.style.display = "block";
};

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