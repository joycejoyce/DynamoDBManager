import {expect, getJSDOM} from "./common-func-for-tests.js";
import "regenerator-runtime/runtime.js";

let window, document, $;

async function refreshDom() {
    const jsdom = await getJSDOM("index.html");
    window = jsdom.window;
    document = jsdom.document;
    $ = jsdom.$;
}

describe(`CreateTableView`, () => {
    describe(`"Create Table" button`, () => {
        before(async () => {
            await refreshDom();
        });
        
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
            before(async () => {
                await refreshDom();
            });
            
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
        
        describe(`"Delete All" button`, () => {
            before(async () => {
                await refreshDom();
            });
            
            it(`When click on "Delete All (attributes) button", a confirm message box will be shown`, () => {
                const deleteAllBtn = document.getElementById("delete-all-attributes-btn");
                deleteAllBtn.disabled = false;
                
                const id = "confirm-delete-all-attributes";
                
                let confirmPage = document.getElementById(id);
                expect(null === confirmPage).to.be.true;
                
                deleteAllBtn.click();
                
                confirmPage = document.getElementById(id);
                expect(null === confirmPage).to.be.false;
            });
        });

        describe(`Components of an Attribute Control Item`, () => {
            let attrCtrlItem;
            before(async () => {
                await refreshDom();
                document.getElementById("add-attribute-btn").click();
                attrCtrlItem = document.getElementsByClassName("attribute-control-item")[0];
            });

            it(`has a delete button`, () => {
                const numOfDeleteAttrBtn = attrCtrlItem.getElementsByClassName("delete-attribute-control-item-btn").length;
                expect(numOfDeleteAttrBtn).to.eql(1);
            });

            it(`has a attribute type dropdown`, () => {
                const numOfAttrTypeDropdown = attrCtrlItem.getElementsByClassName("attribute-type-dropdown").length;
                expect(numOfAttrTypeDropdown).to.eql(1);
            });

            it(`has a attribute name input field`, () => {
                const numOfAttrNameInputField = attrCtrlItem.getElementsByClassName("attribute-name-input").length;
                expect(numOfAttrNameInputField).to.eql(1);
            });
        });

        describe(`Attribute Control Item - delete button`, () => {
            before(async () => {
                await refreshDom();
            });
            
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
                    addBtn.click();
                }
                const deleteAllButton = document.getElementById("delete-all-attributes-btn");
                for(let i=0; i<3; i++) {
                    const deleteButton = document.getElementsByClassName("delete-attribute-control-item-btn")[0];
                    expect(deleteAllButton.disabled).to.be.false;
                    deleteButton.click();
                }
                expect(deleteAllButton.disabled).to.be.true;
            });
        })

        describe(`Attribute Control Item - attribute type dropdown`, () => {
            before(async () => {
                await refreshDom();
                document.getElementById("add-attribute-btn").click();
            });
            
            it(`An attribute type dropdown contains a button`, () => {
                const numOfTypeBtn = document.getElementsByClassName("attribute-type-btn").length;
                expect(numOfTypeBtn).to.eql(1);
            });

            it(`Types include: string, number, boolean`, () => {
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
