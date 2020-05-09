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

describe(`CreateTableView`, () => {
    it(`Click "Create Table collapsible" makes "create-table-page" display style changes from "none" to "display"`, () => {
        const pageElem = document.getElementById("create-table-page");
        const displayValue1 = 
        window.getComputedStyle(pageElem).getPropertyValue("display");
        expect(displayValue1).to.eql("none");
        
        const collapsibleElem = document.getElementById("create-table-collapsible");
        collapsibleElem.click();
        
        const displayValue2 = window.getComputedStyle(pageElem).getPropertyValue("display");
        expect(displayValue2).to.eql("block");
    });
});
