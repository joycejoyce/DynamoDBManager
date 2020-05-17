import {expect, getJSDOM, expectDisplayValueToBe} from "./common-func-for-tests.js";
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
    
    describe(`setBtnText()`, () => {
        let dropdownBtn;
        
        before(() => {
            dropdownBtn = dropdownModule.getBtn();
        });
        
        it(`Set the text of the button`, () => {
            const text = "Test";
            dropdownModule.setBtnText(text);
            
            expect(dropdownBtn.textContent).to.eql(text);
        });
    });
    
    describe(`setListItems()`, () => {
        let dropdownList;
        
        before(() => {
            dropdownList = dropdownModule.getList();
        });
        
        it(`Create <a> elements for input`, () => {
            const items = ["A","B","C"];
            
            dropdownModule.setListItems(items);
            
            expect(dropdownList.childElementCount).to.eql(items.length);
            
            const dropdownListItems = Array.from(dropdownList.querySelectorAll("a")).map(elem => elem.textContent);
            items.forEach(item => expect(dropdownListItems.includes(item)).to.be.true);
        });
    });
    
    describe(`createDropdownInDoc()`, () => {
        after(async () => {
            await getDropdownModule();
        });
        
        it(`Create a dropdown in the current document`, () => {
            const parent = document.querySelector("#hash-key-row");
            const id = "test-id";
            dropdownModule.createDropdownInDoc(parent, id);
            expect(parent.querySelectorAll("#"+id).length).to.eql(1);
        });
    });
    
    describe(`Dropdown button`, () => {
        describe(`#click`, () => {
            after(async () => {
                await getDropdownModule();
            });
            
            it(`Toggle dropdown list to display or hide`, () => {
                const id = "testId";
                const parent = document.querySelectorAll("#hash-key-row td")[1];
                dropdownModule.createDropdownInDoc(parent, id);
                
                const dropdown = document.getElementById(id);
                const dropdownBtn = dropdown.querySelector(".dropdown-btn");
                const dropdownList = dropdown.querySelector(".dropdown-list");
                
                for(let i=0; i<3; i++) {
                    if(i%2 == 0) {
                        expectDisplayValueToBe(window, dropdownList, "none");
                    }
                    else {
                        expectDisplayValueToBe(window, dropdownList, "block");
                    }
                    dropdownBtn.click();
                }
            });
        });
    });
});