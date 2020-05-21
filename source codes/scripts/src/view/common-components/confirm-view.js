function ConfirmView() {}

const confirmView = getConfirmView();
const confirmPage = getConfirmPage();

function getConfirmView() {
    return document.querySelector(".confirm-container");
}

function getConfirmPage() {
    return getConfirmView().querySelector(".confirm-page");
}

ConfirmView.addEventListeners = () => {
    listenOnClickWindow();
};

function listenOnClickWindow() {
    window.addEventListener("click", (e) => {
        if(e.target == confirmPage) {
            ConfirmView.reset();
        }
    });
}

ConfirmView.reset = () => {
    removeAllChildsExceptConfirmMsg();
    hide(confirmView);
    removeId(confirmView);
};

function removeAllChildsExceptConfirmMsg() {
    removeElemByTagName("button");
    removeElemByTagName("textarea");
}

function removeElemByTagName(tagName) {
    const elems = Array.from(confirmPage.querySelectorAll(tagName));
    elems.forEach(elem => elem.remove());
}

function hide(elem) {
    elem.style.display = "none";
}

function removeId(elem) {
    elem.id = "";
}

ConfirmView.createWithYesAndNoBtn = (id, confirmMsg) => {
    create(id, confirmMsg);
    createYesAndNoBtn();
};

function removeAllBtn() {
    const allBtn = Array.from(confirmPage.querySelectorAll("button"));
    allBtn.forEach(btn => btn.remove());
}

function create(id, confirmMsg) {
    ConfirmView.reset();
    confirmView.id = id;
    confirmView.querySelector(".confirm-msg").textContent = confirmMsg;
    confirmView.style.display = "block";
}

function createYesAndNoBtn() {
    const yesBtn = getBtnWithClassName("Yes");
    confirmPage.appendChild(yesBtn);

    const noBtn = getBtnWithClassName("No");
    confirmPage.appendChild(noBtn);
    listenOnNoBtn();
}

function getBtnWithClassName(text) {
    const btn = document.createElement("button");
    btn.className = text.toLowerCase();
    btn.textContent = text;
    return btn;
}

function listenOnNoBtn() {
    const noBtn = confirmView.querySelector("button.no");
    noBtn.addEventListener("click", () => {
        ConfirmView.reset();
    });
}

ConfirmView.createWithInfo = (id, confirmMsg, infoText) => {
    create(id, confirmMsg);
    createInfoTextArea(infoText);
    createOkBtn();
    createCopyBtn();
};

function createInfoTextArea(infoText) {
    const textArea = document.createElement("textarea");
    textArea.textContent = infoText;
    textArea.readOnly = true;
    textArea.rows = "20";
    textArea.cols = "60";
    confirmPage.appendChild(textArea);
}

function createOkBtn() {
    const okBtn = getBtnWithClassName("OK");
    confirmPage.appendChild(okBtn);
    listenOnClickOkBtn();
}

function listenOnClickOkBtn() {
    const btn = confirmPage.querySelector("button.ok");
    btn.addEventListener("click", ConfirmView.reset);
}

function createCopyBtn() {
    const copyBtn = getBtnWithClassName("Copy");
    confirmPage.appendChild(copyBtn);
    listenOnClickCopyBtn();
}

function listenOnClickCopyBtn() {
    const btn = confirmPage.querySelector("button.copy");
    btn.addEventListener("click", copyText);
}

function copyText() {
    const textArea = confirmPage.querySelector("textarea");
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

export {
    ConfirmView
};