function CommonView() {
    this.addEventListeners = () => {
        listenOnClickMainTabs();
    };
    
    function listenOnClickMainTabs {
        mainTabs.addEventListener("click", () => {
            const mainTabs = document.getElementsByClassName("main-tab");
            
        });
    }
}

export {
    CommonView
};