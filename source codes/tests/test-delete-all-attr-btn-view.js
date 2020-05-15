import {expect, getJSDOM, expectDisplayValueToBe, checkConfirmPageIsReset, createAttrCtrlItems} from "./common-func-for-tests.js";
import {DeleteAllAttrBtnView} from "../scripts/src/view/create-table-view/delete-all-attr-ctrl-item-btn-view.js";
import "regenerator-runtime/runtime.js";

let window, document, $;

async function refreshDom() {
    const jsdom = await getJSDOM("index.html");
    window = jsdom.window;
    document = jsdom.document;
    $ = jsdom.$;
}

describe(`DeleteAllAttrBtnView`, () => {
    describe(`#click`, () => {
        let deleteAllBtn;
        
        beforeEach(async () => {
            await refreshDom();
            deleteAllBtn = getDeleteAllBtn();
        });

        it(`The confirm page is given id = "delete-all-attr-ctrl-items"`, () => {
            let confirmPage = getConfirmPage();
            expect(null == confirmPage).to.be.true;
            
            deleteAllBtn.disabled = false;
            deleteAllBtn.click();
            
            confirmPage = getConfirmPage();
            expect(null == confirmPage).to.be.false;
        });
    });
    
    function getDeleteAllBtn() {
        return document.querySelector("#delete-all-attr-ctrl-item-btn");
    }
    
    function getConfirmPage() {
        return document.querySelector(".confirm-container#delete-all-attr-ctrl-items");
    }
    
    describe(`Confirm Page`, () => {
        describe(`#components`, () => {
            let deleteAllBtn;
            
            before(async () => {
                await refreshDom();
                deleteAllBtn = getDeleteAllBtn();
                deleteAllBtn.disabled = false;
                deleteAllBtn.click();
            });
            it(`confirm message = ${DeleteAllAttrBtnView.confirmMessage}`, () => {
                const msg = getConfirmPage().querySelector(".confirm-msg").innerHTML;
                expect(msg).to.eql(DeleteAllAttrBtnView.confirmMessage);
            })
        });
        
        describe(`"Yes" button`, () => {
            let deleteAllBtn;
            
            beforeEach(async () => {
                await refreshDom();
                deleteAllBtn = getDeleteAllBtn();
            });
            
            function getYesBtn() {
                return document.querySelector(".confirm-container#delete-all-attr-ctrl-items .yes");
            }
            
            describe(`#click`, () => {
                it(`Remove all Attribute Control Items`, () => {
                    const num = 3;
                    createAttrCtrlItems(document, num);

                    const attrCtrlItems = document.getElementsByClassName("attribute-control-item");
                    expect(attrCtrlItems.length).to.eql(num);
                    
                    getDeleteAllBtn().click();
                    getYesBtn().click();
                    
                    expect(attrCtrlItems.length).to.eql(0);
                });

                it(`Reset the confirm page()`, () => {
                    createAttrCtrlItems(document, 1);
                    getDeleteAllBtn().click();
                    const confirmPage = getConfirmPage();
                    expectDisplayValueToBe(window, confirmPage, "block");
                    
                    getYesBtn().click();
                    
                    checkConfirmPageIsReset(window, confirmPage);
                });
            });
        });
    });
});
