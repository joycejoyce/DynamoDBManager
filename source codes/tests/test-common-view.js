import {expect, getJSDOM} from "./common-func-for-tests.js";
import "regenerator-runtime/runtime.js";

let window, document, $;

async function refreshDom() {
    const jsdom = await getJSDOM("index.html");
    window = jsdom.window;
    document = jsdom.document;
    $ = jsdom.$;
}

describe(`CommonView`, () => {
    describe(`Main tabs`, () => {
        describe(`#click`, () => {
            beforeEach(async () => {
                await refreshDom();
            });
            
            it(`Show the corresponding page`, () => {
                const pageElem = document.getElementById("main-page-2");
                const displayValue1 = 
                window.getComputedStyle(pageElem).getPropertyValue("display");
                expect(displayValue1).to.eql("none");

                const tabElem = document.getElementById("main-tab-2");
                tabElem.click();

                const displayValue2 = window.getComputedStyle(pageElem).getPropertyValue("display");
                expect(displayValue2).to.eql("block");
            })
        });
    });
});