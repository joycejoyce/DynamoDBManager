const chai = require("chai");
chai.config.includeStack = true;
const expect = chai.expect;

function printErrorStack(err) {
    console.log("===== error stack (start) =====");
    console.log(err);
    console.log("===== error stack (end) =====");
}

async function getJSDOM(file) {
    let window, document, $;
    const { JSDOM } = require("jsdom");
    let jsdom = await JSDOM.fromFile(file, {
        resources: "usable",
        runScripts: "dangerously",
        url: "http://dynamo.db.localhost/" + file
    })
    .then((dom) => {
        window = dom.window;
        window.isTesting = true;
        document = window.document;
        $ = require("jquery")(window);
        global.AWS = require("aws-sdk");
    });

    await new Promise(resolve => window.addEventListener("load", resolve));
    await window.System.import("event-listener")
        .then((module) => {
            new module.EventListener().addEventListeners();
        });
    
    return {
        window: window,
        document: document,
        $: $
    };
}

function expectDisplayValueToBe(window, elem, expectedValue) {
    const actualValue = window.getComputedStyle(elem).getPropertyValue("display");

    expect(expectedValue).to.eql(actualValue);
}

module.exports = {
    chai,
    expect,
    printErrorStack,
    getJSDOM,
    expectDisplayValueToBe
};