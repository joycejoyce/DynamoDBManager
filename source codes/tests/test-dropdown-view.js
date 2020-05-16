import {expect, getJSDOM} from "./common-func-for-tests.js";
import "regenerator-runtime/runtime.js";

let window, document, $;

async function refreshDom() {
    const jsdom = await getJSDOM("index.html");
    window = jsdom.window;
    document = jsdom.document;
    $ = jsdom.$;
}

let dropdownModule;

async function getDropdownModule() {
    await refreshDom();
    await window.System.import("dropdown-view")
        .then((module) => {
            dropdownModule = new module.DropdownView();
        });
}

describe(`DropdownView`, () => {
    before(async () => {
        await getDropdownModule();
    });
    
    describe(`getDoc()`, () => {
        let dropdownDoc;
        
        before(() => {
            dropdownDoc = dropdownModule.getDoc();
        });
        
        describe(`#components`, () => {
            it(`Has 2 Components`, () => {
                expect(dropdownDoc.childElementCount).to.eql(2);
            });

            it(`Contains a button with class="dropdown-btn"`, () => {
                const btn = dropdownDoc.querySelectorAll("button");
                expect(btn.length).to.eql(1);
                expect(btn[0].className).to.eql("dropdown-btn");
            });

            it(`Contains a div with class="dropdown-list"`, () => {
                const list = dropdownDoc.querySelectorAll("div");
                expect(list.length).to.eql(1);
                expect(list[0].className).to.eql("dropdown-list");
            });
        });
    });
    
    describe(`setBtn()`, () => {
        let dropdownBtn;
        
        before(() => {
            dropdownBtn = dropdownModule.getBtn();
        });
        
        it(`Set the value of the button`, () => {
            const value = "Test";
            dropdownModule.setBtn({value: value});
            
            expect(dropdownBtn.value).to.eql(value);
        });
        
        it(`Set the onclick event`, () => {
            const attrName = "data-value";
            const attrValue = "test";
            const setDataValue = () => {
                dropdownBtn.setAttribute(attrName, attrValue);
            }
            
            dropdownModule.setBtn({value: "Test", clickEvent: setDataValue});
            
            expect(dropdownBtn.getAttribute(attrName)).to.eql(null);
            
            dropdownBtn.click();
            
            expect(dropdownBtn.getAttribute(attrName)).to.eql(attrValue);
        });
    });
    
    describe(`setList()`, () => {
        let dropdownList;
        
        before(() => {
            dropdownList = dropdownModule.getList();
        });
        
        it(`Create <a> elements for input`, () => {
            const list = ["A","B","C"];
            
            dropdownModule.setList(list);
            
            expect(dropdownList.childElementCount).to.eql(list.length);
            
            const dropdownListItems = Array.from(dropdownList.querySelectorAll("a")).map(elem => elem.textContent);
            list.forEach(item => expect(dropdownListItems.includes(item)).to.be.true);
        });
    });
});