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
                queryCondition: {
                    display: "none",
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
                    query: {
                        onClick: this.handleClickQuery
                    },
                    conditions: [],
                    condNum: -1,
                    onChangeQueryCondition: this.handleChangeOnQueryCondition
                },
                attrData: {
                    defList: [],
                    nameOptions: [],
                    nameTypeMap: {}
                }
            },
            
        };
    }
    
    componentDidMount() {
        this.setTableNameOptions();
        this.resetQueryConditions();
        console.log("init conditions", this.state.formControls.queryCondition.conditions);
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
        const conditions = [this.getEmptyCondition()];
        const condNum = 1;
        
        const formControls = {...this.state.formControls};
        formControls.queryCondition.conditions = conditions;
        formControls.queryCondition.condNum = condNum;
        
        this.setState({formControls});
    }
    
    async handleChangeOnTableName(e) {
        await this.changeHandler(e);
        
        this.resetQueryConditions();
        
        const formControls = {...this.state.formControls};
        
        formControls.queryCondition.display = "block";
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
        const condition = this.getEmptyCondition();
        condition.id = this.state.formControls.queryCondition.condNum++;
        const formControls = {...this.state.formControls};
        formControls.queryCondition.conditions.push(condition);
        this.setState({formControls});
    }
    
    enableDeleteAllQueryCondition() {
        const formControls = {...this.state.formControls};
        formControls.queryCondition.deleteAll.disabled = false;
        this.setState({formControls});
    }
    
    handleClickDeleteQueryCondition(id) {
        if(this.state.formControls.queryCondition.condNum <= 1) {
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
        console.log("arguments", arguments);
        const formControls = {...this.state.formControls};
        const newConditions = formControls.queryCondition.conditions.reduce((result, condition) => {
            if(condition.id === id) {
                condition[condName] = condValue;
                
                if(condName === QUERY_CONDITION.attrName) {
                    this.modifyConditionByAttrName(condValue, condition);
                    console.log("operatorOptions", condition.operatorOptions);
                    console.log("valueOptions", condition.valueOptions);
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
    
    handleClickQuery() {
        
    }
    
    render() {
        return (
            <div id="manage-table-items">
                <Query
                    tableName={this.state.formControls.tableName}
                    queryCondition={this.state.formControls.queryCondition}
                    attrData={this.state.formControls.attrData}
                />
                {/*<Modify />*/}
            </div>
        );
    }
}

class Query extends React.Component {
    render() {
        const queryConditionStyles = {
            display: this.props.queryCondition.display
        };
        
        return (
            <form id="query-form">
                <section id="tableName">
                    <h1>Table Name</h1>
                    <Dropdown
                        name="tableName"
                        value={this.props.tableName.value}
                        onChange={this.props.tableName.onChange}
                        options={this.props.tableName.options}
                    />
                </section>
                <section id="queryCondition" style={queryConditionStyles}>
                    <h1>Query Conditions</h1>
                    <input type="button" value="Add" onClick={this.props.queryCondition.add.onClick} />
                    <input type="button" value="Delete All" onClick={this.props.queryCondition.deleteAll.onClick} disabled={this.props.queryCondition.deleteAll.disabled} />
                    <QueryConditionTable queryCondition={this.props.queryCondition}
                        attrData={this.props.attrData}/>
                    <input type="submit" value="Query" onClick={this.props.queryCondition.query.onClick} />
                </section>
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
        this.handleChangeOnAttrName = this.handleChangeOnAttrName.bind(this);
        this.handleChangeOnOperator = this.handleChangeOnOperator.bind(this);
        this.handleChangeOnValue = this.handleChangeOnValue.bind(this);
    }
    
    handleClickOnDelete() {
        this.props.queryCondition.delete.onClick(this.props.condition.id);
    }
    
    handleChangeOnAttrName(e) {
        const attrName = e.target.value;
        this.props.queryCondition.onChangeQueryCondition(this.props.condition.id, QUERY_CONDITION.attrName, attrName);
    }
    
    handleChangeOnOperator(e) {
        const operator = e.target.value;
        this.props.queryCondition.onChangeQueryCondition(this.props.condition.id, QUERY_CONDITION.operator, operator);
    }
    
    handleChangeOnValue(e) {
        const value = e.target.value;
        this.props.queryCondition.onChangeQueryCondition(this.props.condition.id, QUERY_CONDITION.value, value);
    }
    
    render() {
        let valueInput;
        if(this.props.condition.valueOptions.length == 0) {
            valueInput = <input
                type="text"
                name="value"
                value={this.props.condition.value}
                onChange={this.handleChangeOnValue}
            />;
        }
        else {
            valueInput = <Dropdown
                name="value"
                value={this.props.condition.value}
                onChange={this.handleChangeOnValue}
                options={this.props.condition.valueOptions}
            />;
        }
        
        let operatorInput;
        if(this.props.condition.operatorOptions.length == 1) {
            operatorInput = <input
                type="text"
                name="value"
                value={this.props.condition.operatorOptions[0].displayValue}
                onChange={this.handleChangeOnOperator}
                readOnly
            />;
        }
        else {
            operatorInput = <Dropdown
                name="operator"
                value={this.props.condition.operator}
                onChange={this.handleChangeOnOperator}
                options={this.props.condition.operatorOptions}
            />
        }

        return (
            <tr>
                <td>
                    <img src="./resources/manage-table-items-page/delete-cond.png"
                        alt="delete"
                        onClick={this.handleClickOnDelete}
                    />
                </td>
                <td>
                    <Dropdown
                        name="attrName"
                        value={this.props.condition.attrName}
                        onChange={this.handleChangeOnAttrName}
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

export {
    ManageTableItemsView
};