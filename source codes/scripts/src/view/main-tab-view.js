function MainTabView() {
    this.addEventListeners = () => {
        listenOnClickMainTabs();
    };
    
    function listenOnClickMainTabs() {
        const mainTabElements = Array.from(document.querySelectorAll("#main-tabs>button"));
        mainTabElements.forEach((elem) => {
            elem.addEventListener("click", (e) => changeActivePage(e.target));
        });
    }
    
    function changeActivePage(elem) {
        document.querySelector("#main-pages>.active").classList.remove("active");
        const num = elem.id.split("-").pop();
        const targetId = `main-page-${num}`;
        document.getElementById(targetId).classList.add("active");
    }
}

export {
    MainTabView
};