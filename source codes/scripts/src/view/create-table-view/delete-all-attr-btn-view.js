import {ConfirmView} from "../confirm-view.js";

function DeleteAllAttrBtnView() {
    const confirmPage = ConfirmView.get();
    
    this.addEventListeners = () => {
        listenOnClick();
    };
    
    function listenOnClick() {
        const btn = document.getElementById("delete-all-attributes-btn");
        btn.addEventListener("click", () => {
            showConfirmPage();
            listenOnClickYesBtn();
        });
    }
    
    function showConfirmPage() {
        console.log("Enter showConfirmPage()");
        confirmPage.style.display = "block";
        confirmPage.id = "delete-all-attributes";
    }
    
    function listenOnClickYesBtn() {
        const yesBtn = document.querySelector("#delete-all-attributes .yes");
        yesBtn.addEventListener("click", () => {
            clickAllDeleteAttrBtn();
            ConfirmView.reset();
        });
    }
    
    function clickAllDeleteAttrBtn() {
        while(1) {
            const deleteAttrBtn = document.querySelector(".delete-attribute-control-item-btn");
            
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