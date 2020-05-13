function CommonView() {
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
            hideConfirmContainer(e);
        });
    }
    
    function hideConfirmContainer(event) {
        const confirmContainer = document.getElementsByClassName("confirm-container")[0];
        if(event.target == confirmContainer) {
            confirmContainer.style.display = "none";
            confirmContainer.id = "";
        }
    }
}

export {
    CommonView
};