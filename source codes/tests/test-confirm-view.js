import {expect, getJSDOM, expectDisplayValueToBe} from "./common-func-for-tests.js";
import "regenerator-runtime/runtime.js";

let window, document, $;
beforeEach(refreshDom);

async function refreshDom() {
    const jsdom = await getJSDOM("index.html");
    window = jsdom.window;
    document = jsdom.document;
    $ = jsdom.$;
}

describe(`ConfirmView`, () => {
    function getConfirmPage() {
        return document.querySelector(".confirm-container");
    }
    
    describe(`#trigger points`, () => {
        let confirmPage;
        
        beforeEach(async () => {
            await refreshDom();
            confirmPage = getConfirmPage();
        });
        
        it(`When click on "Delete All" button in Create Table page`, () => {
            expectDisplayValueToBe(window, confirmPage, "none")
            
            const deleteAllBtn = document.querySelector("#attribute-definitions #delete-all-attributes-btn");
            deleteAllBtn.disabled = false;
            
            deleteAllBtn.click();
            
            expectDisplayValueToBe(window, confirmPage, "block");
        });
    });
    
    describe(`"No" button`, () => {
        let noBtn;
        let confirmPage;
        
        before(async () => {
            await refreshDom();
            confirmPage = getConfirmPage();
            noBtn = confirmPage.querySelector("button.no");
        });
        
        describe(`#click`, () => {
            it(`Reset the confirm page`, () => {
                confirmPage.style.display = "block";
                confirmPage.id = "test";
                
                noBtn.click();
                
                checkConfirmPageIsReset(window, confirmPage);
            });
        });
    });
});

function checkConfirmPageIsReset(window, confirmPage) {
    expectDisplayValueToBe(window, confirmPage, "none");
    expect(confirmPage.id).to.eql("");
}

export {
    checkConfirmPageIsReset
};