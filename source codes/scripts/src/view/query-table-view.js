import { Dropdown } from "./common-components/dropdown.js";
import { Util } from "./common-components/util.js";
import { TableModel } from "../model/table-model.js";

const React = require("react");

class QueryTableView extends React.Component {
    constructor() {
        super();
        this.state = {
            tables: [],
            chosenTable: "",
            attrNames: []
        };
        this.setTables();
        
        this.setTables = this.setTables.bind(this);
        this.setChosenTable = this.setChosenTable.bind(this);
        this.setAttrNames = this.setAttrNames.bind(this);
        
        this.handleChooseTable = this.handleChooseTable.bind(this);
        this.handleChooseAttrName = this.handleChooseAttrName.bind(this);
    }
    
    setTables() {
        return new Promise(async (resolve) => {
            const tables = await TableModel.list();
            await this.setState(state => ({ tables: tables }));
            resolve();
        });
    }
    
    setChosenTable(table) {
        return new Promise(async (resolve) => {
            await this.setState(state => ({ chosenTable: table }));
            resolve();
        });
        
    }
    
    setAttrNames() {
        return new Promise(async (resolve) => {
            const attrNames = await TableModel.describe(this.state.chosenTable, TableModel.describeName.attributeName);
            await this.setState(state => ({ attrNames: attrNames }));
            resolve();
        });
    }
    
    handleChooseTable(table) {
        return new Promise(async (resolve) => {
            await this.setChosenTable(table);
            const queryConditionElem = document.querySelector("#query-condition");
            Util.toggleElemMaxHeight(queryConditionElem);

            resolve();
        });
    }
    
    handleChooseAttrName() {
        return new Promise(async (resolve) => {
            await this.setAttrNames();
            resolve();
        });
    }
    
    render() {
        return (
            <div>
                <ChooseTable contents={this.state.tables} updateList={this.setTables} clickItem={this.handleChooseTable} />
                <QueryCondition contents={this.state.attrNames} updateList={this.setAttrNames} clickItem={this.handleChooseAttrName} />
            </div>
        );
    }
}

class ChooseTable extends React.Component {
    render() {
        return (
            <section id="choose-table">
                <h1>Choose a table:</h1>
                <Dropdown id="table-list" contents={this.props.contents} updateList={this.props.updateList} clickItem={this.props.clickItem} />
            </section>
        );
    }
}

class QueryCondition extends React.Component {    
    render() {
        return(
            <section id="query-condition">
                <h1>Query Conditions:</h1>
                <div id="test">
                    Attribute: <Dropdown id="attr-list" contents={this.props.contents} updateList={this.props.updateList} clickItem={this.props.clickItem} />
                </div>
            </section>
        );
    }
}

export { QueryTableView };