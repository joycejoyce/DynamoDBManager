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
            attrDefList: []
        };
        this.condNum = 0;
        this.setTableList();
        
        this.handleTableListClick = this.handleTableListClick.bind(this);
        this.handleTableNameClick = this.handleTableNameClick.bind(this);
        this.handleAddCondBtnClick = this.handleAddCondBtnClick.bind(this);
        this.handleAttrNameClick = this.handleAttrNameClick.bind(this);
        this.handleCondValueChange = this.handleCondValueChange.bind(this);
        this.handleCondValueChange = this.handleCondValueChange.bind(this);
        
        this.setTableList = this.setTableList.bind(this);
        this.getCondId = this.getCondId.bind(this);
        this.getNewConditions = this.getNewConditions.bind(this);
    }
    
    handleTableListClick() {
        this.setTableList();
    }
    
    async handleTableNameClick(tableName) {
        const attrDefList = await TableModel.describe(tableName, TableModel.describeName.attrDef);
        const id = this.getCondId();
        const firstCond = { id: id, attrName: "", operator: "", value: "" };
        this.setState(state => ({ 
            queryConditionsSectionDisplay: "block",
            tableName: tableName,
            attrDefList: attrDefList,
            conditions: [firstCond]
        }));
    }
    
    getCondId() {
        const id = "cond" + (this.condNum++).toString();
        return id;
    }
    
    async setTableList() {
        const tableList = await TableModel.list();
        this.setState(state => ({ tableList: tableList }));
    }
    
    handleAddCondBtnClick() {
        const id = this.getCondId();
        const newConditions = this.state.conditions.concat({ id: id, attrName: "", operator: "", value: "" });
        this.setState(state => ({ conditions: newConditions }));
    }
    
    async handleAttrNameClick(id, attrName) {
        const newConditions = this.getNewConditions(id, "attrName", attrName);
        this.setState({ conditions: newConditions });
    }
    
    getNewConditions(id, prop, newValue) {
        const curConditions = this.state.conditions;
        const newConditions = curConditions.reduce((result, cond) => {
            if(cond.id === id) {
                cond[prop] = newValue;
            }
            result.push(cond);
            return result;
        }, []);
        return newConditions;
    }
    
    handleCondValueChange(id, value) {
        const newConditions = this.getNewConditions(id, "value", value);
        this.setState({ conditions: newConditions });
    }
    
    handleCondValueChange(id, operator) {
        const newConditions = this.getNewConditions(id, "operator", operator);
        this.setState({ conditions: newConditions });
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
                    attrDefList={this.state.attrDefList}
                    onAttrNameClick={this.handleAttrNameClick}
                    onOperatorClick={this.handleOperatorClick}
                    onCondValueChange={this.handleCondValueChange}
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
                                <td>Operator</td>
                                <td>Value</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.conditions.map(cond => (<CondCtrlItem key={cond.id} id={cond.id} attrDefList={this.props.attrDefList} onAttrNameClick={this.props.onAttrNameClick} onCondValueChange={this.props.onCondValueChange} onOperatorClick={this.props.onOperatorClick} />))
                            }
                        </tbody>
                    </table>
                </section>
            </form>
        );
    }
}

class CondCtrlItem extends React.Component {
    constructor() {
        super();
        this.state = {
            operatorList: []
        };
        
        this.handleAttrNameClick = this.handleAttrNameClick.bind(this);
        this.handleOperatorClick = this.handleOperatorClick.bind(this);
        this.handleCondValueChange = this.handleCondValueChange.bind(this);
        
        this.getAttrType = this.getAttrType.bind(this);
    }
    
    handleAttrNameClick(attrName) {
        this.props.onAttrNameClick(this.props.id, attrName);
        
        const attrType = this.getAttrType(attrName);
        let operatorList = [];
        switch(attrType) {
            case "S":
                operatorList = ["=", "<", ">", "<=", ">="];
                break;
            case "N":
                operatorList = ["=", "<", ">", "<=", ">="];
                break;
            case "B":
                operatorList = ["true", "false"];
                break;
            default:
                operatorList = ["(unexpected attribute type)"];
                break;
        }
        this.setState({ operatorList: operatorList });
    }
    
    getAttrType(attrName) {
        const type = this.props.attrDefList.filter(def => def.AttributeName === attrName)[0].AttributeType;
        return type;
    }
    
    handleOperatorClick(operator) {
        
    }
    
    handleCondValueChange(e) {
        const value = e.target.value;
        const id = this.props.id;
        this.props.onCondValueChange(id, value);
    }
    
    render() {
        const attrNameList = this.props.attrDefList.map(def => def.AttributeName);
        return (
            <tr className="cond-ctrl-item">
                <td><img className="delete-cond-ctrl-item-btn" src="./resources/manage-table-items-page/delete-cond-ctrl-item-btn.png" alt="delete this item"/></td>
                <td><Dropdown id={this.props.id+"-attr-name"} contents={attrNameList} onClickListItem={this.handleAttrNameClick} /></td>
                <td><Dropdown id={this.props.id+"-attr-operator"} contents={this.state.operatorList} onOperatorClick={this.handleOperatorClick} /></td>
                <td><input type="text" onChange={this.handleCondValueChange}/></td>
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