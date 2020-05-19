import {ConfirmView} from "../confirm-view.js";
import {AttrCtrlItemView} from "./attr-ctrl-item-view.js";

function DeleteAllAttrBtnView() {
    const CONFIRM_PAGE_CONTENTS = {
        id: "delete-all-attr-ctrl-items",
        msg: "Are you sure you want to delete all attributes?"
    };
    
    this.addEventListeners = () => {
        listenOnClick();
    };
    
    function listenOnClick() {
        const btn = document.getElementById("delete-all-attr-ctrl-item-btn");
        btn.addEventListener("click", () => {
            ConfirmView.create(CONFIRM_PAGE_CONTENTS.id, CONFIRM_PAGE_CONTENTS.msg);
            listenOnClickYesBtn();
        });
    }
    
    function listenOnClickYesBtn() {
        const yesBtn = document.querySelector("#" + CONFIRM_PAGE_CONTENTS.id + " .yes");
        yesBtn.addEventListener("click", () => {
            removeAllAttrCtrlItemElems();
            ConfirmView.reset();
            DeleteAllAttrBtnView.disableBtn();
            AttrCtrlItemView.createAnItem();
        });
    }
    
    function removeAllAttrCtrlItemElems() {
        const elems = Array.from(document.querySelectorAll(".attr-ctrl-item"));
        elems.forEach(elem => elem.remove());
    }
    
    function clickAllDeleteAttrBtn() {
        const deleteBtnNum = document.querySelectorAll(".delete-attr-ctrl-item-btn");
        for(let i=0; i<deleteBtnNum; i++) {
            const deleteBtn = document.querySelector(".delete-attr-ctrl-item-btn");
            deleteBtn.click();
        }
        AttrCtrlItemView.createAnItem();
    }
}

DeleteAllAttrBtnView.disableBtn = () => {
    const btn = document.getElementById("delete-all-attr-ctrl-item-btn");
    btn.disabled = true;
};

export {
    DeleteAllAttrBtnView
};