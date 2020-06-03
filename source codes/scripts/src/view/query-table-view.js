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
            attrNames: [],
            conditions: []
        };
        this.setTables();
        
        this.setTables = this.setTables.bind(this);
        this.setChosenTable = this.setChosenTable.bind(this);
        this.setAttrNames = this.setAttrNames.bind(this);
        
        this.addCondition = this.addCondition.bind(this);
        
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
            const queryConditionElem = document.querySelector("#query");
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
    
    addCondition() {
        const conditions = this.state.conditions;
        const dummyCondition = {attrName: "", operator: "", value: ""};
        const newConditions = conditions.concat(dummyCondition);
        this.setState(state => ({ conditions: newConditions} ));
    }
    
    render() {
        return (
            <form id="query-table-form">
                <section>
                    <h1>Choose a table:</h1>
                    <Dropdown id="table-list" contents={this.state.tables} updateList={this.setTables} clickItem={this.handleChooseTable} />
                </section>
                <section id="query">
                    <h1>Query Conditions:</h1>
                    <button type="button" id="add-cond-btn" onClick={this.addCondition}>Add</button>
                    <button type="button" id="delete-all-cond-btn" disabled>Delete All</button>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>AttributeName</th>
                                <th>Operator</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.conditions.map(cond => (<CondCtrlItem key={cond.attrName+cond.operator} condition={cond} attrNames={this.state.attrNames} onClickAttrName={this.state.handleClickAttrName}/>))
                            }
                        </tbody>
                    </table>
                </section>
            </form>
        );
    }
}

class CondCtrlItem extends React.Component {
    render() {
        return (
            <tr>
                <td><img src="./resources/query-table-page/delete-condition-btn.png"/></td>
                <td><Dropdown className="cond-ctrl-item" contents={this.props.attrNames} updateList={this.props.updateList} clickItem={this.props.onClickAttrName} /></td>
                <td></td>
                <td></td>
            </tr>
        );
    }
}

/*class ChooseTable extends React.Component {
    render() {
        return (
            <section id="choose-table">
                <h1>Choose a table:</h1>
                <Dropdown id="table-list" contents={this.props.contents} updateList={this.props.updateList} clickItem={this.props.clickItem} />
            </section>
        );
    }
}

class QuerySection extends React.Component {
    constructor() {
        super();
        this.state = { conditions: [] };
        this.addCondition = this.addCondition.bind(this);
    }
    
    async addCondition() {
        const conditions = this.state.conditions;
        const dummyCondition = {attrName: "", operator: "", value: ""};
        const newConditions = conditions.concat(dummyCondition);
        await this.setState(state => ({ conditions: newConditions} ));
        this.state.conditions.map(condition => console.log("attrName", condition.attrName));
    }
    
    render() {
        return(
            <section id="query">
                <h1>Query Conditions:</h1>
                    <button id="add-query-condition-btn" onClick={this.addCondition}>Add</button>
                    <Conditions conditions={this.state.conditions}/>
            </section>
        );
    }
}

class Conditions extends React.Component {
    render() {
        return(
            <table id="conditions">
                <thead>
                    <tr>
                        <th></th>
                        <th>AttributeName</th>
                        <th>Operator</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.conditions.map(cond => (<CondCtrlItem key={cond.attrName+cond.operator} condition={cond} />))
                    }
                </tbody>
            </table>
        );
    }
}*/

export { QueryTableView };