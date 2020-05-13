import {expect, getJSDOM} from "./common-func-for-tests.js";
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
    
    describe(`The constructor`, () => {
        let confirmView;
        before(setConfirmView);
        
        function setConfirmView() {
            const confirmElem = document.getElementsByClassName("confirm-container")[0];
    
            const info = {
                id: "dummy",
                msg: "Are you sure you want to delete execute dummy()?",
                action: dummy
            };
            
            confirmView = new ConfirmView(info);
        }
        
        it(`sets the confirm message`, () => {
            const text = confirmElem.querySelector(".confirm-msg").textContent;
            expect(text).to.eql(info.msg);
        })
    })
});