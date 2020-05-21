"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function MainTabView() {
    this.addEventListeners = function () {
      listenOnClickMainTabs();
    };

    function listenOnClickMainTabs() {
      var mainTabElements = Array.from(document.querySelectorAll("#main-tabs>button"));
      mainTabElements.forEach(function (elem) {
        elem.addEventListener("click", function (e) {
          changeActivePage(e.target);
          changeActiveTab(e.target);
        });
      });
    }

    function changeActivePage(clickedTab) {
      var activePage = document.querySelector("#main-pages>.active");
      activePage.classList.remove("active");
      var newActivePage = getNewActivePage(clickedTab);
      newActivePage.classList.add("active");
    }

    function getNewActivePage(clickedTab) {
      var num = clickedTab.id.split("-").pop();
      var targetId = "main-page-".concat(num);
      var newActivePage = document.getElementById(targetId);
      return newActivePage;
    }

    function changeActiveTab(clickedTab) {
      var activeTab = document.querySelector("#main-tabs>.active");
      activeTab.classList.remove("active");
      clickedTab.classList.add("active");
    }
  }

  _export("MainTabView", MainTabView);

  return {
    setters: [],
    execute: function () {}
  };
});