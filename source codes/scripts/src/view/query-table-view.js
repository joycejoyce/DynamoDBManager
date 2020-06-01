import { Dropdown } from "./common-components/dropdown.js";
import { Util } from "./common-components/util.js";
import { TableModel } from "../model/table-model.js";

const React = require("react");

class QueryTableView extends React.Component {
    constructor() {
        super();
        this.state = { tables: [] };
        this.resetTables();
        
        this.resetTables = this.resetTables.bind(this);
    }
    
    resetTables() {
        return new Promise(async (resolve) => {
            const tables = await TableModel.list();
            await this.setState(state => ({ tables: tables }));
            resolve();
        });
    }
    
    render() {
        return (
            <section id="choose-table">
                <h1>Choose a table:</h1>
                <Dropdown id="table-list" btnText="" contents={this.state.tables} updateList={this.resetTables} />
                {/*
                    <QueryCondition id="query-condision"/>
                */}
            </section>
        );
    }
}

export { QueryTableView };