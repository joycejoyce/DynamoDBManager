import {expect, getJSDOM} from "./common-func-for-tests.js";
import "regenerator-runtime/runtime.js";

let window, document, $;
beforeEach(getDom);

async function getDom() {
    const jsdom = await getJSDOM("index.html");
    window = jsdom.window;
    document = jsdom.document;
    $ = jsdom.$;
}

describe(`Testing environment setup`, () => {
    it(`Get <h1> from document body`, () => {
        expect(document.getElementsByTagName("h1")[0].innerHTML).to.eql("DB Data Manager");
    });
});

describe(`CommonView`, () => {
    it(`Click "main-tab-2" makes "main-page-2" display style changes from "none" to "display"`, () => {
        const pageElem = document.getElementById("main-page-2");
        const displayValue1 = 
        window.getComputedStyle(pageElem).getPropertyValue("display");
        expect(displayValue1).to.eql("none");
        
        const tabElem = document.getElementById("main-tab-2");
        tabElem.click();
        
        const displayValue2 = window.getComputedStyle(pageElem).getPropertyValue("display");
        expect(displayValue2).to.eql("block");
    });
});