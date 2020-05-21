function MainTabView() {
    this.addEventListeners = () => {
        listenOnClickMainTabs();
    };
    
    function listenOnClickMainTabs() {
        const mainTabElements = Array.from(document.querySelectorAll("#main-tabs>button"));
        mainTabElements.forEach((elem) => {
            elem.addEventListener("click", (e) => {
                changeActivePage(e.target);
                changeActiveTab(e.target);
            });
        });
    }
    
    function changeActivePage(clickedTab) {
        const activePage = document.querySelector("#main-pages>.active");
        activePage.classList.remove("active");
        
        const newActivePage = getNewActivePage(clickedTab);
        newActivePage.classList.add("active");
    }
    
    function getNewActivePage(clickedTab) {
        const num = clickedTab.id.split("-").pop();
        const targetId = `main-page-${num}`;
        const newActivePage = document.getElementById(targetId);
        return newActivePage;
    }
    
    function changeActiveTab(clickedTab) {
        const activeTab = document.querySelector("#main-tabs>.active");
        activeTab.classList.remove("active");
        
        clickedTab.classList.add("active");
    }
}

export {
    MainTabView
};