import { TableModel } from "../model/table-model.js";
import { Dropdown } from "./common-components/dropdown.js";

const React = require("react");

class ManageTableItemsView extends React.Component {
    constructor() {
        super();
        this.state = {
            tableList: [],
            tableName: "",
            queryConditions: [],
            queryConditionsSectionDisplay: "none",
            conditions: [],
            attrList: []
        };
        this.setTableList();
        
        this.setTableList = this.setTableList.bind(this);
        this.handleTableListClick = this.handleTableListClick.bind(this);
        this.handleTableNameClick = this.handleTableNameClick.bind(this);
        this.handleAddCondBtnClick = this.handleAddCondBtnClick.bind(this);
        this.handleAttrNameClick = this.handleAttrNameClick.bind(this);
    }
    
    handleTableListClick() {
        this.setTableList();
    }
    
    async handleTableNameClick(tableName) {
        console.log("tableName", tableName);
        const attrList = await TableModel.describe(tableName, TableModel.describeName.attributeName);
        console.log("attrList", attrList);
        this.setState(state => ({ 
            queryConditionsSectionDisplay: "block",
            tableName: tableName,
            attrList: attrList
        }));
    }
    
    async setTableList() {
        const tableList = await TableModel.list();
        this.setState(state => ({ tableList: tableList }));
    }
    
    handleAddCondBtnClick() {
        const newConditions = this.state.conditions.concat({ attrName: "", operator: "", value: "" });
        this.setState(state => ({ conditions: newConditions }));
    }
    
    handleAttrNameClick(attrName) {
    }
    
    render() {
        return (
            <div id="manage-table-items">
                <Query
                    onTableListClick={this.handleTableListClick}
                    onTableNameClick={this.handleTableNameClick}
                    onAddCondBtnClick={this.handleAddCondBtnClick}
                    tableList={this.state.tableList}
                    queryConditionsSectionDisplay={this.state.queryConditionsSectionDisplay}
                    conditions={this.state.conditions}
                    attrList={this.state.attrList}
                    onAttrNameClick={this.handleAttrNameClick}
                />
                <Modify />
            </div>
        );
    }
}

class Query extends React.Component {
    render() {
        const styles = {
            queryConditionsSectionDisplay: {
                display: this.props.queryConditionsSectionDisplay
            }
        };
        return (
            <form id="query-form">
                <label htmlFor="tableName"><h1>Choose a table</h1></label>
                <Dropdown id="tableName" contents={this.props.tableList} onClickBtn={this.props.onTableListClick} onClickListItem={this.props.onTableNameClick} />
            
                <section id="conditions" style={styles.queryConditionsSectionDisplay}>
                    <h1>Query Conditions</h1>
                    <button type="button" id="add-btn" onClick={this.props.onAddCondBtnClick}>Add</button>
                    <button type="button" id="delete-all-btn" disabled>Delete All</button>
                    <table id="cond-ctrl-items">
                        <thead>
                            <tr>
                                <td></td>
                                <td>Attribute Name</td>
                                <td></td>
                                <td>Value</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.conditions.map((cond, index) => (<CondCtrlItem key={cond.attrName+cond.operator} id={"id"+index.toString()} condition={cond} attrList={this.props.attrList} onAttrNameClick={this.props.onAttrNameClick} />))
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
            <tr className="cond-ctrl-item">
                <td><img src="./resources/manage-table-items-page/delete-cond-ctrl-item-btn.png" alt="delete this item"/></td>
                <td><Dropdown id={this.props.id} contents={this.props.attrList} onClickListItem={this.props.onAttrNameClick} /></td>
            </tr>
        );
    }
}
    
class Modify extends React.Component {
    render() {
        return (
            <form id="modify-form">
            </form>
        );
    }
}

export {
    ManageTableItemsView
};