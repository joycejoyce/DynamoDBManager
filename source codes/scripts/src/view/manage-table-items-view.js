import { TableModel } from "../model/table-model.js";
import { Dropdown } from "./form-components/dropdown.js";
import { Select } from "./form-components/select.js";
import { validate } from "./form-components/validate.js";

const React = require("react");

class ManageTableItemsView extends React.Component {
    constructor() {
        super();
        
        this.handleChangeOnTableName = this.handleChangeOnTableName.bind(this);
        this.handleChangeOnQueryCondition = this.handleChangeOnQueryCondition.bind(this);
        this.handleClickOnAddQueryCondition = this.handleClickOnAddQueryCondition.bind(this);
        this.handleClickDeleteAllQueryCondition = this.handleClickDeleteAllQueryCondition.bind(this);
        this.handleClickDeleteQueryCondition = this.handleClickDeleteQueryCondition.bind(this);
        this.handleClickQuery = this.handleClickQuery.bind(this);
        this.handleClickAddItem = this.handleClickAddItem.bind(this);
        
        this.setTableNameOptions = this.setTableNameOptions.bind(this);
        
        this.changeHandler = this.changeHandler.bind(this);
        this.addCondition = this.addCondition.bind(this);
        this.enableDeleteAllQueryCondition = this.enableDeleteAllQueryCondition.bind(this);
        this.resetQueryConditions = this.resetQueryConditions.bind(this);
        
        this.state = {
            formIsValid: false,
            formControls: {
                tableName: {
                    name: "tableName",
                    value: "Choose a table...",
                    valid: false,
                    validationRules: {
                        isRequired: true
                    },
                    options: [],
                    onChange: this.handleChangeOnTableName
                },
                attrData: {
                    defList: [],
                    nameOptions: [],
                    nameTypeMap: {}
                },
                queryCondition: {
                    add: {
                        onClick: this.handleClickOnAddQueryCondition
                    },
                    deleteAll: {
                        onClick: this.handleClickDeleteAllQueryCondition,
                        disabled: false
                    },
                    delete: {
                        onClick: this.handleClickDeleteQueryCondition
                    },
                    conditions: [],
                    onChange: this.handleChangeOnQueryCondition
                },
                query: {
                    display: "none",
                    onClick: this.handleClickQuery
                },
                modify: {
                    display: "none",
                    onClickAddItem: this.handleClickAddItem,
                    items: []
                }
            },
            
        };
    }
    
    componentDidMount() {
        this.setTableNameOptions();
        this.resetQueryConditions();
    }
    
    getEmptyCondition() {
        return ({
            [QUERY_CONDITION.id]: 0,
            [QUERY_CONDITION.attrName]: "",
            [QUERY_CONDITION.operator]: "",
            [QUERY_CONDITION.value]: "",
            [QUERY_CONDITION.operatorOptions]: [],
            [QUERY_CONDITION.valueOptions]: []
        });
    }
    
    resetQueryConditions() {
        const formControls = {...this.state.formControls};
        formControls.queryCondition.conditions = [this.getEmptyCondition()];
        this.setState({formControls});
    }
    
    async handleChangeOnTableName(e) {
        await this.changeHandler(e);
        
        this.resetQueryConditions();
        
        const formControls = {...this.state.formControls};
        
        formControls.query.display = "block";
        formControls.modify.display = "block";
        formControls.attrData = await this.getAttrData();
        
        this.setState({formControls});
    }
    
    async getAttrData() {
        const defList = await this.getAttrDefList();
        const nameOptions = this.getAttrNameOptions(defList);
        const nameTypeMap = this.getAttrNameTypeMap(defList);
        
        const attrData = {
            defList: defList,
            nameOptions: nameOptions,
            nameTypeMap: nameTypeMap
        };
        
        return attrData;
    }
    
    getAttrDefList() {
        return new Promise(async resolve => {
            const tableName = this.state.formControls.tableName.value;
            const attrDefList = await TableModel.describe(tableName, TableModel.describeName.attrDef);
            resolve(attrDefList);
        });
    }
    
    getAttrNameOptions(attrDefList) {
        const attrNameList = attrDefList.map(attrDef => attrDef[TableModel.describeName.attrName]);
        const attrNameOptions = Dropdown.getOptionsByList(attrNameList);
        return attrNameOptions;
    }
    
    getAttrNameTypeMap(attrDefList) {
        const attrNameTypeMap = {};
        attrDefList.forEach(attrDef => 
            attrNameTypeMap[attrDef[TableModel.describeName.attrName]] = attrDef[TableModel.describeName.attrType]
        );
        
        return attrNameTypeMap;
    }
    
    handleClickOnAddQueryCondition() {
        this.addCondition();
        this.enableDeleteAllQueryCondition();
    }
    
    addCondition() {
        const formControls = {...this.state.formControls};
        const condition = this.getEmptyCondition();
        condition.id = formControls.queryCondition.conditions.length;
        formControls.queryCondition.conditions.push(condition);
        this.setState({formControls});
    }
    
    enableDeleteAllQueryCondition() {
        const formControls = {...this.state.formControls};
        formControls.queryCondition.deleteAll.disabled = false;
        this.setState({formControls});
    }
    
    handleClickDeleteQueryCondition(id) {
        if(this.state.formControls.queryCondition.conditions.length <= 1) {
            this.resetQueryConditions();
        }
        else {
            const formControls = {...this.state.formControls};
            const curConditions = formControls.queryCondition.conditions;
            const newConditions = curConditions.filter(cond => cond.id !== id);
            formControls.queryCondition.conditions = newConditions;
            this.setState({formControls});
        }
    }
    
    handleClickDeleteAllQueryCondition() {
        this.resetQueryConditions();
    }
    
    changeHandler(event) {
        return new Promise(async resolve => {
            const name = event.target.name;
            const value = event.target.value;

            const updatedControls = {
                ...this.state.formControls
            };
            const updatedFormElement = {
                ...updatedControls[name]
            };
            updatedFormElement.value = value;
            updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

            updatedControls[name] = updatedFormElement;

            let formIsValid = true;
            for (let inputIdentifier in updatedControls) {
                formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
            }

            await this.setState({
                formControls: updatedControls,
                formIsValid: formIsValid
            });
            
            resolve();
        });
    }
    
    async setTableNameOptions() {
        const tableNameList = await TableModel.list();
        const tableNameOptions = Dropdown.getOptionsByList(tableNameList);
        const formControls = {...this.state.formControls};
        formControls.tableName.options = tableNameOptions;
        this.setState({formControls});
    }
    
    handleChangeOnQueryCondition(id, condName, condValue) {
        const formControls = {...this.state.formControls};
        const newConditions = formControls.queryCondition.conditions.reduce((result, condition) => {
            if(condition.id === id) {
                condition[condName] = condValue;
                
                if(condName === QUERY_CONDITION.attrName) {
                    this.modifyConditionByAttrName(condValue, condition);
                }
            }
            
            return result.concat(condition);
        }, []);
        
        formControls.queryCondition.conditions = newConditions;
        this.setState({formControls});
    }
    
    modifyConditionByAttrName(attrName, condition) {
        const attrType = this.state.formControls.attrData.nameTypeMap[attrName];
                
        const operatorOptions = this.getOperatorOptions(attrType);
        condition.operatorOptions = operatorOptions;

        const valueOptions = this.getValueOptions(attrType);
        condition.valueOptions = valueOptions;
    }
    
    getOperatorOptions(attrType) {
        const listOfTypeNAndS = ["<", ">", "=", "!=", "<=", ">="];
        const listOfTypeB = ["="];
        const listOfInvalidType = [`(invalid attribute type: "${attrType}")`];
        let operatorList = [];
        switch(attrType) {
            case "N":
                operatorList = listOfTypeNAndS;
                break;
            case "S":
                operatorList = listOfTypeNAndS;
                break;
            case "B":
                operatorList = listOfTypeB;
                break;
            default:
                operatorList = listOfInvalidType
                break;
        }
        const operatorOptions = Dropdown.getOptionsByList(operatorList);
        return operatorOptions;
    }
    
    getValueOptions(attrType) {
        const listOfTypeNAndS = [];
        const listOfTypeB = ["true", "false"];
        const listOfInvalidType = [`(invalid attribute type: "${attrType}")`];
        let valueList = [];
        switch(attrType) {
            case "N":
                valueList = listOfTypeNAndS;
                break;
            case "S":
                valueList = listOfTypeNAndS;
                break;
            case "B":
                valueList = listOfTypeB;
                break;
            default:
                valueList = listOfInvalidType;
                break;
        }
        const valueOptions = Dropdown.getOptionsByList(valueList);
        return valueOptions;
    }
    
    handleClickQuery(e) {
        e.preventDefault();
    }
    
    handleClickAddItem() {
        
    }
    
    render() {
        return (
            <div id="manage-table-items">
                <section id="tableName">
                    <h1>Table Name</h1>
                    <Dropdown
                        name="tableName"
                        value={this.state.formControls.tableName.value}
                        onChange={this.state.formControls.tableName.onChange}
                        options={this.state.formControls.tableName.options}
                    />
                </section>
                <Query query={this.state.formControls.query}
                    tableName={this.state.formControls.tableName}
                    queryCondition={this.state.formControls.queryCondition}
                    attrData={this.state.formControls.attrData}
                />
                <Modify modify={this.state.formControls.modify}
                    attrData={this.state.formControls.attrData}
                />
            </div>
        );
    }
}

class Query extends React.Component {
    render() {
        const styles = {
            display: this.props.query.display
        };
        
        return (
            <form id="query-form" style={styles}>
                <h1>Query</h1>
                <input type="button" value="Add" onClick={this.props.queryCondition.add.onClick} />
                <input type="button" value="Delete All" onClick={this.props.queryCondition.deleteAll.onClick} disabled={this.props.queryCondition.deleteAll.disabled} />
                <QueryConditionTable queryCondition={this.props.queryCondition}
                    attrData={this.props.attrData}/>
                <input type="submit" value="Query" onClick={this.props.query.onClick} />
            </form>
        );
    }
}

class QueryConditionTable extends React.Component {
    render() {
        return (
            <table>
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
                        this.props.queryCondition.conditions.map(condition => (
                            <QueryConditionRow key={condition.id}
                                queryCondition={this.props.queryCondition}
                                condition={condition}
                                attrData={this.props.attrData}
                            />
                        ))
                    }
                </tbody>
            </table>
        );
    }
}

class QueryConditionRow extends React.Component {
    constructor() {
        super();
        
        this.state = {
            operatorOptions: [],
            valueOptions: []
        }
        
        this.handleClickOnDelete = this.handleClickOnDelete.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleClickOnDelete() {
        this.props.queryCondition.delete.onClick(this.props.condition.id);
    }
    
    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.props.queryCondition.onChange(this.props.condition.id, name, value);
    }
    
    render() {
        let valueInput;
        if(this.props.condition.valueOptions.length == 0) {
            valueInput = <input
                type="text"
                name="value"
                value={this.props.condition.value}
                onChange={this.handleInputChange}
            />;
        }
        else {
            valueInput = <Dropdown
                name="value"
                value={this.props.condition.value}
                onChange={this.handleInputChange}
                options={this.props.condition.valueOptions}
            />;
        }
        
        let operatorInput;
        if(this.props.condition.operatorOptions.length == 1) {
            operatorInput = <input
                type="text"
                name="operator"
                value={this.props.condition.operatorOptions[0].displayValue}
                onChange={this.handleInputChange}
                readOnly
            />;
        }
        else {
            operatorInput = <Dropdown
                name="operator"
                value={this.props.condition.operator}
                onChange={this.handleInputChange}
                options={this.props.condition.operatorOptions}
            />
        }

        return (
            <tr>
                <td>
                    <input
                        name="delete"
                        type="image"
                        src="./resources/manage-table-items-page/delete-cond.png"
                        alt="delete"
                        onClick={this.handleClickOnDelete}
                    />
                </td>
                <td>
                    <Dropdown
                        name="attrName"
                        value={this.props.condition.attrName}
                        onChange={this.handleInputChange}
                        options={this.props.attrData.nameOptions}
                    />
                </td>
                <td>
                    {operatorInput}
                </td>
                <td>
                    {valueInput}
                </td>
            </tr>
        );
    }
}

const QUERY_CONDITION = {
    id: "id",
    attrName: "attrName",
    operator: "operator",
    value: "value",
    operatorOptions: "operatorOptions",
    valueOptions: "valueOptions"
};

class Modify extends React.Component {
    render() {
        const styles = {
            display: this.props.modify.display
        };
        
        return(
            <form id="modify-form"  style={styles}>
                <h1>Modify</h1>
                <input type="button" value="Add Item" onClick={this.props.modify.onClickAddItem} />
                <ModifyConditionTable attrData={this.props.attrData} />
            </form>
        );
    }
}

class ModifyConditionTable extends React.Component {
    render() {
        return(
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td>No.</td>
                        {
                            this.props.attrData.nameOptions.map(option => (
                                <td key={option.value}>{option.displayValue}</td>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        );
    }
}

export {
    ManageTableItemsView
};