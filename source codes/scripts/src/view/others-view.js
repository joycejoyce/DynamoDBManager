import {ConfirmView} from "./confirm-view.js";

function OthersView() {
    this.addEventListeners = () => {
        listenOnClickMainTabs();
        listenOnClickWindow();
    };
    
    function listenOnClickMainTabs() {
        const mainTabElements = Array.from(document.querySelectorAll("#main-tabs>button"));
        mainTabElements.forEach((elem) => {
            elem.addEventListener("click", () => changeActivePage(elem));
        });
    }
    
    function changeActivePage(elem) {
        document.querySelector("#main-pages>.active").classList.remove("active");
        const num = elem.id.split("-").pop();
        const targetId = `main-page-${num}`;
        document.getElementById(targetId).classList.add("active");
    }
    
    function listenOnClickWindow() {
        window.addEventListener("click", (e) => {
            if(e.target == ConfirmView.get()) {
                ConfirmView.reset();
            }
        });
    }    
}

export {
    OthersView
};