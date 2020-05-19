import {ConfirmView} from "../common-components/confirm-view.js";
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
            new AttrCtrlItemView().createAnItem();
        });
    }
    
    function removeAllAttrCtrlItemElems() {
        const elems = Array.from(document.querySelectorAll(".attr-ctrl-item"));
        elems.forEach(elem => elem.remove());
    }
}

DeleteAllAttrBtnView.disableBtn = () => {
    const btn = document.getElementById("delete-all-attr-ctrl-item-btn");
    btn.disabled = true;
};

export {
    DeleteAllAttrBtnView
};