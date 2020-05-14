import {expect, getJSDOM, expectDisplayValueToBe} from "./common-func-for-tests.js";
import {checkConfirmPageIsReset} from "./test-confirm-view.js";
import {DeleteAllAttrBtnView} from "../scripts/src/view/create-table-view/delete-all-attr-btn-view.js";
import "regenerator-runtime/runtime.js";

let window, document, $;

async function refreshDom() {
    const jsdom = await getJSDOM("index.html");
    window = jsdom.window;
    document = jsdom.document;
    $ = jsdom.$;
}

let deleteAllBtn;

before(async () => {
    await refreshDom();
    deleteAllBtn = getDeleteAllBtn();
});

function getDeleteAllBtn() {
    return document.querySelector("#attribute-definitions #delete-all-attributes-btn");
}

describe(`DeleteAllAttrBtnView`, () => {
    describe(`#click`, () => {
        beforeEach(async () => {
            await refreshDom();
        });
        
        it(`The confirm page is given id = "delete-all-attributes"`, () => {
            let confirmPage = getConfirmPage();
            expect(null == confirmPage).to.be.true;
            
            deleteAllBtn.disabled = false;
            deleteAllBtn.click();

            confirmPage = getConfirmPage();
            expect(null == confirmPage).to.be.false;
        });
    });
    
    function getConfirmPage() {
        return document.querySelector(".confirm-container#delete-all-attributes");
    }
    
    describe(`Confirm Page`, () => {
        describe(`#components`, () => {
            beforeEach(async () => {
                await refreshDom();
                createAttrCtrlItems(1);
                deleteAllBtn.click();
            });
            
            it(`confirm message = ${DeleteAllAttrBtnView.confirmMessage}`, async () => {
                const msg = getConfirmPage().querySelector(".confirm-msg").innerHTML;
                expect(msg).to.eql(DeleteAllAttrBtnView.confirmMessage);
            })
        });
        
        function createAttrCtrlItems(num) {
            const addAttrBtn = document.querySelector("#add-attribute-btn");

            for(let i=0; i<num; i++) {
                addAttrBtn.click();
            }
        }
        
        describe(`"Yes" button`, () => {
            beforeEach(async () => {
                await refreshDom();
            });
            
            function getYesBtn() {
                deleteAllBtn.click();
                return document.querySelector(".confirm-container#delete-all-attributes .yes");
            }
            
            describe(`#click`, () => {
                it(`Remove all Attribute Control Items`, () => {
                    const num = 3;
                    createAttrCtrlItems(num);
                    
                    const attrCtrlItems = document.getElementsByClassName("attribute-control-item");
                    
                    expect(attrCtrlItems.length).to.eql(num);
                    
                    getYesBtn().click();
                    
                    expect(attrCtrlItems.length).to.eql(0);
                });

                it(`Reset the confirm page()`, () => {
                    const confirmPage = getConfirmPage();
                    
                    expectDisplayValueToBe(window, confirmPage, "block");
                    
                    getYesBtn().click();
                    
                    checkConfirmPageIsReset(window, confirmPage);
                });
            });
        });
    })
});
