import {expect, getJSDOM} from "./common-func-for-tests.js";
import "regenerator-runtime/runtime.js";

let window, document, $;
before(refreshDom);

async function refreshDom() {
    const jsdom = await getJSDOM("index.html");
    window = jsdom.window;
    document = jsdom.document;
    $ = jsdom.$;
}

describe(`CreateTableView`, () => {
    describe(`"Create Table" button`, () => {
        it(`When click on "Create Table button", the max-height of "Create Table page" would be toggled between "0px" and null`, () => {
            const pageElem = document.getElementById("create-table-page");

            const collapsibleElem = document.getElementById("create-table-btn");

            for(let i=0; i<3; i++) {
                collapsibleElem.click();
                let maxHeight = window.getComputedStyle(pageElem).getPropertyValue("max-height");
                if(i%2 == 0) {
                    expect(maxHeight).to.eql("0px");
                }
                else {
                    expect(maxHeight).to.eql("0");
                }
            }
        });
    });
    
    describe(`"Attribute Definitions" section`, () => {
        describe(`"Add" button`, () => {
            afterEach(refreshDom);
            
            it(`When click on "Add (attribute) button", an attribute control item will be generated`, () => {
                const addBtn = document.getElementById("add-attribute-btn");
                for(let i=0; i<3; i++) {
                    addBtn.click();
                    let numOfAttributeControlItems = document.getElementsByClassName("attribute-control-item").length;
                    expect(numOfAttributeControlItems).to.eql(i+1);
                }
            });
            
            it(`When click on "Add (attribute) button", the "Delete All (attributes) button" will be clickable`, () => {
                const addBtn = document.getElementById("add-attribute-btn");
                addBtn.click();
                const deleteAllBtn = document.getElementById("delete-all-attributes-btn");
                const disabled = deleteAllBtn.disabled;
                expect(disabled).to.be.false;
            });
        });
        
        /*describe(`"Delete All" button`, () => {            
            it(`When click on "Delete All (attributes) button, a confirm message box will be shown"`, () => {
                const deleteAllBtn = document.getElementById("delete-all-attributes-btn");
                deleteAllBtn.click();
                const confirmPage = document.getElementById("delete-all-attributes-confirm-page");
                expect(typeof null === confirmPage).to.be.false;
            });
        });*/

        describe(`Attribute Control Item`, () => {
            let attrCtrlItem;
            before(() => {
                document.getElementById("add-attribute-btn").click();
                attrCtrlItem = document.getElementsByClassName("attribute-control-item")[0];
            });
            after(() => refreshDom());

            it(`An attribute control item contains a delete button`, () => {
                const numOfDeleteAttrBtn = attrCtrlItem.getElementsByClassName("delete-attribute-control-item-btn").length;
                expect(numOfDeleteAttrBtn).to.eql(1);
            });

            it(`An attribute control item contains a attribute type dropdown`, () => {
                const numOfAttrTypeDropdown = attrCtrlItem.getElementsByClassName("attribute-type-dropdown").length;
                expect(numOfAttrTypeDropdown).to.eql(1);
            });

            it(`An attribute control item contains a attribute name input field`, () => {
                const numOfAttrNameInputField = attrCtrlItem.getElementsByClassName("attribute-name-input").length;
                expect(numOfAttrNameInputField).to.eql(1);
            });
        });

        describe(`Attribute Control Item - delete button`, () => {
            after(() => refreshDom());

            it(`When click on the delete button, the attribute control item will be deleted`, () => {
                document.getElementById("add-attribute-btn").click();

                const attrCtrlItem = document.getElementsByClassName("attribute-control-item")[0];

                let numOfItems = document.getElementsByClassName("attribute-control-item").length;
                expect(numOfItems).to.eql(1);

                const deleteBtn = attrCtrlItem.getElementsByClassName("delete-attribute-control-item-btn")[0];
                deleteBtn.click();

                numOfItems = document.getElementsByClassName("attribute-control-item").length;
                expect(numOfItems).to.eql(0);
            });
            
            it(`When click on the last delete button, "Delete All (attributes) button" will be unclickable`, async () => {
                const addBtn = document.getElementById("add-attribute-btn");
                for(let i=0; i<3; i++) {
                    await addBtn.click();
                }
                const deleteButtons = document.getElementsByClassName("delete-attribute-control-item-btn");
                const deleteAllButton = document.getElementById("delete-all-attributes-btn");
                console.log("deleteButtons # = " + deleteButtons.length);
                console.log("(1)item # = " + document.getElementsByClassName("attribute-control-item").length);
                for(let i=0; i<3; i++) {
                    console.log("i = " + i);
                    expect(deleteAllButton.disabled).to.be.false;
                    await deleteButtons[i].click();
                    console.log("loop over");
                }
                console.log("(2)item # = " + document.getElementsByClassName("attribute-control-item").length);
                expect(deleteAllButton.disabled).to.be.true;
            });
        })

        describe(`Attribute Control Item - attribute type dropdown`, () => {
            before(() => {
                document.getElementById("add-attribute-btn").click();
            });
            after(() => refreshDom());

            it(`An attribute dropdown contains a button`, () => {
                const numOfTypeBtn = document.getElementsByClassName("attribute-type-btn").length;
                expect(numOfTypeBtn).to.eql(1);
            });

            it(`An attribute dropdown contains types: string, number, boolean`, () => {
                const dropdown = document.getElementsByClassName("attribute-type-dropdown")[0];
                const contents = getDropdownContents(dropdown);
                expect(contents.length).to.eql(3);
                expect(contents.includes("string")).to.be.true;
                expect(contents.includes("number")).to.be.true;
                expect(contents.includes("boolean")).to.be.true;
            })

            function getDropdownContents(dropdown) {
                const contents = Array.from(dropdown.querySelectorAll(".attribute-type-contents>a"))
                .map(elem => elem.textContent);
                return contents;
            }

            it(`When click on the attribute dropdown, the dropdown contents will be toggled between displayed and hidden`, () => {
                const contentsElem = document.getElementsByClassName("attribute-type-contents")[0];
                const attributeTypeBtn = document.getElementsByClassName("attribute-type-btn")[0];

                for(let i=0; i<3; i++) {
                    let display = window.getComputedStyle(contentsElem).getPropertyValue("display");

                    if(i%2 == 0) {
                        expect(display).to.eql("none");
                    }
                    else {
                        expect(display).to.eql("block");
                    }

                    attributeTypeBtn.click();
                }
            })
        });
    });
    
    
});
