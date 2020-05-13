import {ConfirmPageView} from "../confirm-page-view.js";

function DeleteAllAttrBtnView() {    
    this.addEventListeners = () => {
        listenOnClick();
    };
    
    function listenOnClick() {
        const btn = document.getElementById("delete-all-attributes-btn");
        btn.addEventListener("click", setupConfirmPage);
    }
    
    function setupConfirmPage() {
        const info = {
            id: "confirm-delete-all-attributes",
            msg: "Are you sure you want to delete all attributes?",
            action: clickAllDeleteAttrBtns
        };
        const confirmPage = new ConfirmPageView();
        confirmPage.setPageInfo(info);
        confirmPage.show();
        
        const confirmContainer = document.getElementsByClassName("confirm-container")[0];
        
        const confirmMsg = "Are you sure you want to delete all attributes?";
        confirmContainer.getElementsByClassName("confirm-msg")[0].textContent = confirmMsg;
        
        confirmContainer.id = id;
        
        confirmContainer.style.display = "block";
    }
    
    function listenOnClickConfirmBtns() {
        listenOnYesBtn();
        listenOnNoBtn();
    }
    
    function listenOnYesBtn() {
        const btn = document.querySelector("#"+id+">.yes");
        btn.addEventListener("click", clickAllDeleteAttrBtns);
    }
    
    function listenOnNoBtn() {
    }
}

export {
    DeleteAllAttrBtnView
};