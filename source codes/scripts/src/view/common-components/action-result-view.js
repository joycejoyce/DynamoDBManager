import {ConfirmView} from "./confirm-view.js";

function ActionResultView() {}

ActionResultView.showErrMsg = (action, err) => {
    console.log("Enter showErrMsg()");
    const id = action;
    const confirmMsg = "Error:";
    const info = getErrMsg(action, err);
    console.log("info", info);
    ConfirmView.createWithInfo(id, confirmMsg, info);
}

function getErrMsg(action, err) {
    const contents = JSON.stringify(err, undefined, 2);
    const msg = "Unable to " + action + ":\n" + contents;
    return msg;
};

ActionResultView.showSuccessMsg = (action, data) => {
    const id = action;
    const confirmMsg = "Data:";
    const info = getSuccessMsg(action, data);
    ConfirmView.createWithInfo(id, confirmMsg, info);
}

function getSuccessMsg(action, data) {
    const contents = JSON.stringify(data, undefined, 2);
    const msg = "Successfully " + action + ":\n" + contents;
    return msg;
};

export {
    ActionResultView
};