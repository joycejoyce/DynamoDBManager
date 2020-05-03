const chai = require("chai");
chai.config.includeStack = true;
const expect = chai.expect;

function checkDOMProperties(dom, propertiesToCheck) {
    let keys = Object.keys(propertiesToCheck);
    let values = Object.values(propertiesToCheck);
    keys.forEach((item, index) => {
        expect(dom[item]).to.eql(values[index]);
    });
}

function loadHTML() {
    const { JSDOM } = require("jsdom");
    const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
    const { window } = jsdom;
    global.document = window.document;
    global.$ = require("jquery")(window);
}

function printErrorStack(err) {
    console.log("===== error stack (start) =====");
    console.log(err);
    console.log("===== error stack (end) =====");
}

function getFormattedErrorMsg(err) {
    const errorMsg = err.stack.split("\n")[5].trim();
    //console.log("errorMsg = " + errorMsg);
    const fileName = errorMsg.split(":")[1].split(/[/\\]/).pop();
    //console.log("fileName = " + fileName);
    const functionName = errorMsg.split(":")[0].split(" ")[1];
    //console.log("functionName = " + functionName);
    const lineNum = errorMsg.split(":")[2];
    //console.error(`Caught error: ${err.message} (at line: ${lineNum})`);
    
    return {
        errorMsg: errorMsg,
        fileName: fileName,
        functionName: functionName,
        lineNum: lineNum
    };
}

module.exports = {
    chai,
    expect,
    checkDOMProperties,
    loadHTML,
    printErrorStack,
    getFormattedErrorMsg
};