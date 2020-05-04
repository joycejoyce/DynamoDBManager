import {expect} from "./common-func-for-tests.js";
import {Query} from "../scripts/src/db-operators/query.js";
import {TABLE_NAME} from "../scripts/src/constants/db-info.js";

describe(`Query DB Data`, () => {
    it(`getAllTblNames()`, () => {
        const tblNames = new Query().getAllTblNames();
        tblNames.map((tblName) => tblName.toUpperCase());
        expect(tblNames.length).to.eql(3);
        const allTblNames = Object.values(TABLE_NAME);
        allTblNames.forEach((tblName) => {
            expect(tblNames.includes(tblName)).to.be.true;
        });
    })
})