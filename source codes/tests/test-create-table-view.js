import {expect, getJSDOM} from "./common-func-for-tests.js";
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
            addBtn = document.querySelector("#attribute-definitions #add-attribute-btn");
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
                const deleteAllBtn = document.getElementById("delete-all-attributes-btn");

                let disabled = deleteAllBtn.disabled;
                expect(disabled).to.be.true;

                addBtn.click();

                disabled = deleteAllBtn.disabled;
                expect(disabled).to.be.false;
            });
        });
    });

    describe(`Attribute Control Item`, () => {
        let attrCtrlItem;
        
        function createAttrCtrlItem() {
            getAddBtn().click();
            attrCtrlItem = document.getElementsByClassName("attribute-control-item")[0];
        }
        
        function getAddBtn() {
            return document.getElementById("add-attribute-btn");
        }
        
        describe(`#components`, () => {
            before(async () => {
                await refreshDom();
                createAttrCtrlItem();
            });
            
            it(`has 3 components`, () => {
                expect(attrCtrlItem.childElementCount).to.eql(3);
            });

            it(`a delete button`, () => {
                const numOfDeleteAttrBtn = attrCtrlItem.getElementsByClassName("delete-attribute-control-item-btn").length;
                expect(numOfDeleteAttrBtn).to.eql(1);
            });

            it(`an attribute type dropdown`, () => {
                const numOfAttrTypeDropdown = attrCtrlItem.getElementsByClassName("attribute-type-dropdown").length;
                expect(numOfAttrTypeDropdown).to.eql(1);
            });

            it(`a attribute name input field`, () => {
                const numOfAttrNameInputField = attrCtrlItem.getElementsByClassName("attribute-name-input").length;
                expect(numOfAttrNameInputField).to.eql(1);
            });
        });
        
        describe(`delete button`, () => {
            let addBtn;
            
            beforeEach(async () => {
                await refreshDom();
                addBtn = getAddBtn();
            });
            
            describe(`#click`, () => {
                it(`Delete the attribute control item`, () => {
                    const num = 3;
                    for(let i=0; i<num; i++) {
                        addBtn.click();
                    }
                    let numOfItems = document.getElementsByClassName("attribute-control-item").length;
                    expect(numOfItems).to.eql(num);

                    for(let i=0; i<num; i++) {
                        getDeleteBtn().click();
                    }
                    numOfItems = document.getElementsByClassName("attribute-control-item").length;
                    expect(numOfItems).to.eql(0);
                });
                
                function getDeleteBtn() {
                    const attrCtrlItem = document.getElementsByClassName("attribute-control-item")[0];
                    return attrCtrlItem.getElementsByClassName("delete-attribute-control-item-btn")[0];
                }
                
                it(`If it's the last delete button, "Delete All (attributes) button" becomes disabled`, () => {
                    let num = 3;

                    for(let i=0; i<num; i++) {
                        addBtn.click();
                    }

                    const deleteAllButton = document.getElementById("delete-all-attributes-btn");

                    for(let i=0; i<num; i++) {
                        expect(deleteAllButton.disabled).to.be.false;
                        getDeleteBtn().click();
                    }
                    expect(deleteAllButton.disabled).to.be.true;
                });
            });
        });
        
        describe(`Attribute Type dropdown`, () => {
            let attrTypeDropdown;
            
            before(async () => {
                await refreshDom();
                createAttrCtrlItem();
                attrTypeDropdown = getAttrTypeDropdown();
            });
            
            function getAttrTypeDropdown() {
                return document.getElementsByClassName("attribute-type-dropdown")[0];
            }
            
            describe(`#components`, () => {
                it(`has 2 components`, () => {
                    expect(attrTypeDropdown.childElementCount).to.eql(2);
                });
                
                it(`a button`, () => {
                    const numOfTypeBtn = attrTypeDropdown.getElementsByClassName("attribute-type-btn").length;
                    expect(numOfTypeBtn).to.eql(1);
                });
                
                it(`a list of types`, () => {
                    const numOfList = attrTypeDropdown.getElementsByClassName("attribute-type-contents").length;
                    expect(numOfList).to.eql(1);
                });
            });
            
            describe(`button`, () => {
                let btn;
                
                before(() => {
                    btn = $(attrTypeDropdown).find(".attribute-type-btn")[0];
                });
                
                describe(`#click`, () => {
                    it(`Toggle the list of types between displayed and hidden`, () => {
                        const listOfTypes = attrTypeDropdown.getElementsByClassName("attribute-type-contents")[0];
                        
                        const num = 3;
                        
                        for(let i=0; i<num; i++) {
                            let display = window.getComputedStyle(listOfTypes).getPropertyValue("display");

                            if(i%2 == 0) {
                                expect(display).to.eql("none");
                            }
                            else {
                                expect(display).to.eql("block");
                            }

                            btn.click();
                        }
                    });
                });
            });
            
            describe(`list of types`, () => {
                let listOfTypes;
                
                before(() => {
                    listOfTypes = Array.from($(attrTypeDropdown).find(".attribute-type-contents>a")).map(elem => elem.textContent);
                });
                
                describe(`#components`, () => {
                    it(`has 3 types`, () => {
                        expect(listOfTypes.length).to.eql(3);
                    });

                    it(`string, number, boolean`, () => {
                        expect(listOfTypes.includes("string")).to.be.true;
                        expect(listOfTypes.includes("number")).to.be.true;
                        expect(listOfTypes.includes("boolean")).to.be.true;
                    });
                });
            });
        });
    });
});
