import {ConfirmView} from "../confirm-view.js";

function DeleteAllAttrBtnView() {
    const confirmPage = ConfirmView.get();
    
    this.addEventListeners = () => {
        listenOnClick();
    };
    
    function listenOnClick() {
        const btn = document.getElementById("delete-all-attr-ctrl-item-btn");
        btn.addEventListener("click", () => {
            showConfirmPage();
            listenOnClickYesBtn();
        });
    }
    
    function showConfirmPage() {
        confirmPage.id = "delete-all-attr-ctrl-items";
        confirmPage.querySelector(".confirm-msg").textContent = DeleteAllAttrBtnView.confirmMessage;
        confirmPage.style.display = "block";
    }
    
    function listenOnClickYesBtn() {
        const yesBtn = document.querySelector("#delete-all-attr-ctrl-items .yes");
        yesBtn.addEventListener("click", () => {
            clickAllDeleteAttrBtn();
            ConfirmView.reset();
        });
    }
    
    function clickAllDeleteAttrBtn() {
        while(1) {
            const deleteAttrBtn = document.querySelector(".delete-attr-ctrl-item-btn");
            
            if(null == deleteAttrBtn) {
                break;
            }
            
            deleteAttrBtn.click();
        }
    }
}

DeleteAllAttrBtnView.confirmMessage = "Are you sure you want to delete all attributes?";

export {
    DeleteAllAttrBtnView
};