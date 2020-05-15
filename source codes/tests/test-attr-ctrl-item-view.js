import {expect, getJSDOM, expectDisplayValueToBe} from "./common-func-for-tests.js";
import "regenerator-runtime/runtime.js";

let window, document, $;

async function refreshDom() {
    const jsdom = await getJSDOM("index.html");
    window = jsdom.window;
    document = jsdom.document;
    $ = jsdom.$;
}

describe(`AttrCtrlItemView`, () => {
    describe(`#components`, () => {
        let attrCtrlItem;
        
        before(async() => {
            await refreshDom();
            const addAttrBtn = document.getElementById("add-attr-ctrl-item-btn");
            addAttrBtn.click();
            attrCtrlItem = document.querySelector(".attribute-control-item");
        });
        
        it(`Has 3 components`, () => {
            expect(attrCtrlItem.childElementCount).to.eql(3);
        });
        
        it(`Contains a delete button`, () => {
            expect(attrCtrlItem.getElementsByClassName("delete-attr-ctrl-item-btn").length).to.eql(1);
        });
        
        it(`Contains a type dropdown`, () => {
            expect(attrCtrlItem.getElementsByClassName("attribute-type-dropdown").length).to.eql(1);
        });
        
        it(`Contains a attribute name input`, () => {
            expect(attrCtrlItem.getElementsByClassName("attribute-name-input").length).to.eql(1);
        })
    });
});

describe(`(AttrCtrlItemView) Delete button`, () => {
    describe(`#click`, () => {
        beforeEach(async () => {
            await refreshDom();
        });
        
        it(`Delete the attrCtrlItem`, () => {
            const num = 3;
            
            const addAttrBtn = document.getElementById("add-attr-ctrl-item-btn");
            for(let i=0; i<num; i++) {
                addAttrBtn.click();
            }
            const attrCtrlItems = document.getElementsByClassName("attribute-control-item");
            expect(attrCtrlItems.length).to.eql(num);
            
            for(let i=0; i<num; i++) {
                const deleteAttrBtn = document.querySelector(".delete-attr-ctrl-item-btn");
                deleteAttrBtn.click();
            }
            
            expect(attrCtrlItems.length).to.eql(0);
        });
        
        it(`If it's the last delete button, "Delete All (attributes) button" becomes disabled`, () => {
            const addAttrBtn = document.getElementById("add-attr-ctrl-item-btn");
            addAttrBtn.click();
            
            const deleteAllAttrBtn = document.getElementById("delete-all-attr-ctrl-item-btn");
            expect(deleteAllAttrBtn.disabled).to.be.false;
            
            const deleteAttrBtn = document.querySelector(".delete-attr-ctrl-item-btn");
            deleteAttrBtn.click();
            
            expect(deleteAllAttrBtn.disabled).to.be.true;
        });
    });
});

describe(`(AttrCtrlItemView) Type dropdown`, () => {
    describe(`#components`, () => {
        let typeDropdown;
        
        before(async () => {
            await refreshDom();
            const addAttrBtn = document.getElementById("add-attr-ctrl-item-btn");
            addAttrBtn.click();
            typeDropdown = document.querySelector(".attribute-type-dropdown");
        });
        
        it(`Has 2 components`, () => {
            expect(typeDropdown.childElementCount).to.eql(2);
        });
        
        it(`Contains a type button`, () => {
            expect(typeDropdown.getElementsByClassName("attribute-type-btn").length).to.eql(1);
        });
        
        it(`Contains a type list`, () => {
            expect(typeDropdown.getElementsByClassName("attribute-type-list").length).to.eql(1);
        });
    });
    
    describe(`Type button`, () => {
        let typeBtn;
        
        beforeEach(async () => {
            await refreshDom();
            const addAttrBtn = document.getElementById("add-attr-ctrl-item-btn");
            addAttrBtn.click();
            typeBtn = document.querySelector(".attribute-type-btn");
        });
        
        describe(`#click`, () => {
            it(`Toggle between showing and hiding the type list`, () => {
                const typeList = document.querySelector(".attribute-type-list");
                expectDisplayValueToBe(window, typeList, "none");
                
                typeBtn.click();
                
                expectDisplayValueToBe(window, typeList, "block");
            });
        })
    });
    
    describe(`Type list`, () => {
        describe(`#components`, () => {
            let typeList;
        
            before(async () => {
                await refreshDom();
                const addAttrBtn = document.getElementById("add-attr-ctrl-item-btn");
                addAttrBtn.click();
                typeList = document.querySelector(".attribute-type-list");
            });
            
            it(`Has 3 types`, () => {
                const typeNum = typeList.querySelectorAll("a").length;
                expect(typeNum).to.eql(3);
            });
            
            it(`Contains "string", "number", "boolean"`, () => {
                const types = Array.from(typeList.querySelectorAll("a")).map(elem => elem.innerHTML);
                expect(types.includes("string")).to.be.true;
                expect(types.includes("number")).to.be.true;
                expect(types.includes("boolean")).to.be.true;
            });
        });
        
        describe(`#click`, () => {
            let typeList;
        
            beforeEach(async () => {
                await refreshDom();
                const addAttrBtn = document.getElementById("add-attr-ctrl-item-btn");
                addAttrBtn.click();
                typeList = document.querySelector(".attribute-type-list");
            });
            
            it(`Click on "x" (x=string/number/boolean), then the type button text will be changed to "x"`, () => {
                const typeNum = typeList.childElementCount;
                const typeBtn = document.getElementsByClassName("attribute-type-btn")[0];
                for(let i=0; i<typeNum; i++) {
                    const typeElem = typeList.querySelectorAll("a")[0];
                    const text = typeElem.textContent;
                    typeElem.click();
                    expect(typeBtn.textContent).to.eql(text);
                }
            });
        });
    });
});