import "regenerator-runtime/runtime.js";
import {expect} from "./common-func-for-tests.js";
import {Query} from "../scripts/src/db-operators/query.js";
import {TABLE_NAME} from "../scripts/src/constants/db-info.js";

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
        global.AWS = require("aws-sdk");
    });

    await new Promise(resolve => window.addEventListener("load", resolve));
    await window.System.import("event-handler").then((module) => {
            new module.EventHandler().addEventHandlers();
        });
});

describe(`Query DB Data`, () => {
    it(`getAllTblNames()`, async () => {
        const tblNames = await new Query().getAllTblNames();
        tblNames.map((tblName) => tblName.toUpperCase());
        const allTblNames = Object.values(TABLE_NAME);
        allTblNames.forEach((tblName) => {
            expect(tblNames.includes(tblName)).to.be.true;
        });
    })
})

describe(`Create Tables`, () => {
    
})