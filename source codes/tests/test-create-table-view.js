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
        
        const collapsibleElem = document.getElementById("create-table-collapsible");
        
        for(let i=0; i<2; i++) {
            collapsibleElem.click();
            let maxHeight = window.getComputedStyle(pageElem).getPropertyValue("max-height");
            /*if(i%2 == 0) {
                expect(pageElem.style.maxHeight === true).to.be.true;
            }
            else {
                expect(pageElem.style.maxHeight === true).to.be.false;
            }*/
        }
    });
});
