import "regenerator-runtime/runtime.js";
import {chai, expect, printErrorStack} from "./common-func-for-tests.js";
import {TBL_TRACK_COLUMN, TABLE_NAME} from "../scripts/src/constants/db-info.js";
import {HTML_ID, HTML_CLASS, CSS_PROPERTY, CSS_VALUE} from "../scripts/src/constants/html-properties.js";

describe(`GUI of querying DB data`, () => {
    let window, document, $;
    let jsdom;
    
    beforeEach(async () => {
        const { JSDOM } = require("jsdom");
        jsdom = await JSDOM.fromFile("db-operations.html", {
            resources: "usable",
            runScripts: "dangerously",
            url: "http://dynamo.db.localhost/db-operations.html"
        })
        .then((dom) => {
            window = dom.window;
            window.isTesting = true;
            document = window.document;
            $ = require("jquery")(window);
        });
        
        await new Promise(resolve => window.addEventListener("load", resolve));
        await window.System.import("event-handler").then((module) => {
                new module.EventHandler().addEventHandlers();
            });
    });

    it(`Choose table "track" would show ${HTML_ID.trackTableQueryForm}`, () => {
        try {
            checkBeforeClickOnQueryTableTrack();

            document.getElementById(HTML_ID.queryTableTrack).click();

            checkAfterClickOnQueryTableTrack();
        }
        catch(err) {
            printErrorStack(err);
        }
    });
    
    /*it(``)*/
    
    function checkBeforeClickOnQueryTableTrack() {
        const doms = Array.prototype.slice.call(document.getElementsByClassName(HTML_CLASS.queryForm));
        doms.forEach((dom) => {
            const display = getStyle(CSS_PROPERTY.display, dom);
            expect(display).to.eql(CSS_VALUE.none);
        })
    }

    function getStyle(name, dom) {
        const computedStyle = window.getComputedStyle(dom);
        const style = computedStyle.getPropertyValue(name);
        console.log("style = " + style);
        return style;
    }

    function checkAfterClickOnQueryTableTrack() {
        const dom = document.getElementById(HTML_ID.trackTableQueryForm);
        const display = getStyle(CSS_PROPERTY.display, dom);
        expect(display).to.eql(CSS_VALUE.block);
    }
})