import {expect, getJSDOM, expectDisplayValueToBe} from "./common-func-for-tests.js";
import "regenerator-runtime/runtime.js";

let window, document, $;

async function refreshDom() {
    const jsdom = await getJSDOM("index.html");
    window = jsdom.window;
    document = jsdom.document;
    $ = jsdom.$;
}

describe(`(CreateTableView) Entry Point`, () => {
    describe(`"Create Table" button`, () => {
        let createTableBtn;
        
        before(async () => {
            await refreshDom();
            createTableBtn = document.getElementById("create-table-btn");
        });
        
        describe(`#click`, () => {
            it(`Toggle the max-height of "Create Table page" between "0px" and null`, () => {
                const createTablePage = document.getElementById("create-table-page");

                for(let i=0; i<3; i++) {
                    createTableBtn.click();
                    let maxHeight = window.getComputedStyle(createTablePage).getPropertyValue("max-height");
                    if(i%2 == 0) {
                        expect(maxHeight).to.eql("0px");
                    }
                    else {
                        expect(maxHeight).to.eql("0");
                    }
                }
            });
        });
    });
});

describe(`(CreateTableView) "Attribute Definitions" section`, () => {
    describe(`"Add" button`, () => {
        let addBtn;

        beforeEach(async () => {
            await refreshDom();
            addBtn = document.querySelector("#attribute-definitions #add-attr-ctrl-item-btn");
        });
        
        describe(`#click`, () => {
            it(`Generate an attribute control item`, () => {
                for(let i=0; i<3; i++) {
                    addBtn.click();
                    let numOfAttributeControlItems = document.getElementsByClassName("attribute-control-item").length;
                    expect(numOfAttributeControlItems).to.eql(i+1);
                }
            });

            it(`"Delete All (attributes)" button is enabled`, () => {
                const deleteAllBtn = document.getElementById("delete-all-attr-ctrl-item-btn");

                let disabled = deleteAllBtn.disabled;
                expect(disabled).to.be.true;

                addBtn.click();

                disabled = deleteAllBtn.disabled;
                expect(disabled).to.be.false;
            });
        });
    });
});

describe(`(CreateTableView) "Key Schema" section`, () => {
    describe(`Hash key dropdown`, () => {
        describe(`#components`, () => {
            let hashKeyDropdown;
            before(async () => {
                await refreshDom();
                hashKeyDropdown = document.getElementById("hash-key-dropdown");
            });
            
            it(`Has 2 components`, () => {
                expect(hashKeyDropdown.childElementCount).to.eql(2);
            });
            
            it(`Contains a button`, () => {
                expect(hashKeyDropdown.querySelectorAll("#hash-key-btn").length).to.eql(1);
            });
            
            it(`Contains a list`, () => {
                expect(hashKeyDropdown.querySelectorAll("#hash-key-list").length).to.eql(1);
            });
        });
        
        describe(`Hash Key button`, () => {
            describe(`#click`, () => {
                let hashKeyBtn;
                beforeEach(async () => {
                    await refreshDom();
                    hashKeyBtn = document.getElementById("hash-key-btn");
                });

                it(`Toggle between showing and hiding the hash key list`, () => {
                    const hashKeyList = document.getElementById("hash-key-list");
                    expectDisplayValueToBe(window, hashKeyList, "none");

                    hashKeyBtn.click();
                    
                    expectDisplayValueToBe(window, hashKeyList, "block");
                });
            })
        });
    })
});