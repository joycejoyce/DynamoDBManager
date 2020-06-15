import { TableModel } from "../model/table-model.js";
import { TableItemModel } from "../model/table-item-model.js";

const React = require("react");

class TestElemView extends React.Component {
    constructor() {
        super();
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitCreateTableForm = this.handleSubmitCreateTableForm.bind(this);
        this.handleSubmitAddItemForm = this.handleSubmitAddItemForm.bind(this);
        this.handleSubmitQueryItemForm = this.handleSubmitQueryItemForm.bind(this);
        
        this.createTable = this.createTable.bind(this);
        this.deleteTable = this.deleteTable.bind(this);
        this.genNewTableName = this.genNewTableName.bind(this);
        this.genCreateTableParams = this.genCreateTableParams.bind(this);
        
        this.state = {
            createTable: {
                num: 0,
                onChange: this.handleChange,
                onSubmit: this.handleSubmitCreateTableForm
            },
            addItem: {
                num: 0,
                tableName: "TestTable1",
                onChange: this.handleChange,
                onSubmit: this.handleSubmitAddItemForm
            },
            queryItem: {
                actor: "John",
                year: "1900",
                title: "",
                popular: "Y",
                tableName: "TestTable1",
                onChange: this.handleChange,
                onSubmit: this.handleSubmitQueryItemForm
            },
            results: []
        };
    }
    
    async handleChange(e) {
        const nameParts = e.target.name.split("-");
        console.assert(nameParts.length == 2, "nameParts.length != 2");
        const ctrlName = nameParts[0];
        const ctrlProp = nameParts[1];
        
        const ctrl = {...this.state[ctrlName]};
        ctrl[ctrlProp] = e.target.value;
        await this.setState(state => state[ctrlName] = ctrl);
        
        console.log(`${ctrlName}.${ctrlProp} = ${this.state[ctrlName][ctrlProp]}`)
    }
    
    async handleSubmitCreateTableForm(e) {
        e.preventDefault();
        
        this.setState({results: []});
        const num = this.state.createTable.num;
        let results = [];
        for(let i=1; i<=num; i++) {
            const tableName = this.genNewTableName(i);
            await this.deleteTable(tableName);
            const result = await this.createTable(tableName);
            results.push(result);
        }
        this.setState({results});
    }
    
    genNewTableName(num) {
        const tableName = "TestTable" + num.toString();
        return tableName;
    }
    
    deleteTable(tableName) {
        return new Promise(async resolve => {
            const result = await TableModel.delete(tableName);
            resolve(result);
        });
    }
    
    createTable(tableName) {
        return new Promise(async resolve => {
            const params = this.genCreateTableParams(tableName);
            const result = await TableModel.create(params);
            resolve(result);
        });
    }
    
    genCreateTableParams(tableName) {
        const params = {
            TableName: tableName,
            KeySchema: [{
                    AttributeName: "actor",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "year",
                    KeyType: "RANGE"
                }
            ],
            AttributeDefinitions: [{
                    AttributeName: "actor",
                    AttributeType: "S"
                },
                {
                    AttributeName: "year",
                    AttributeType: "N"
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };
        
        return params;
    }
    
    handleChangeAddItemNum(e) {
        const addItemNum = e.target.value;
        
    }
    
    async handleSubmitAddItemForm(e) {
        e.preventDefault();
        
        this.setState({results: []});
        const params = this.genAddItemsParams();
        const result = await TableItemModel.addItems(params);
        console.log("result", result);
        this.setState({results: [result]});
    }
    
    genAddItemsParams() {
        let items = [];
        let year = 1900;
        for(let i=0; i<this.state.addItem.num; i++) {
            const item = {
                PutRequest: {
                    Item: {
                        /*KEY: {N: year.toString()},*/
                            actor: {S: "John"},
                            year: {N: year.toString()},
                            title: {S: "title-" + year.toString()},
                            popular: {BOOL: (i%2 == 0)}
                    }
                }
            };
            items.push(item);
            
            year++;
        }
        
        const params = {
            RequestItems: {
                [this.state.addItem.tableName]: items
            },
            "ReturnConsumedCapacity": "TOTAL",
            "ReturnItemCollectionMetrics": "SIZE"
        };
        
        return params;
    }
    
    async handleSubmitQueryItemForm(e) {
        e.preventDefault();
        
        this.setState({results: []});
        const params = this.genQueryItemParams();
        const result = await TableItemModel.query(params);
        this.setState({results: [result]});
    }
    
    genQueryItemParams() {
        const ExpressionAttributeNames = {"#a": "actor", "#y": "year", "#t": "title", "#p": "popular"};
        const ExpressionAttributeValues = {
            ":a": {S: this.state.queryItem.actor},
            ":y": {N: this.state.queryItem.year.toString()},
            ":t": {S: this.state.queryItem.title},
            ":p": {BOOL: this.state.queryItem.popular.toLowerCase()=="y"?true:false}
        };
        const ProjectionExpression = "#a, #y, #t, #p";
        const KeyConditionExpression = "#a = :a AND #y < :y";
        const FilterExpression = "#t > :t AND #p = :p";
        const TableName = this.state.queryItem.tableName;
        
        const params = {
            ExpressionAttributeNames,
            ExpressionAttributeValues,
            ProjectionExpression,
            KeyConditionExpression,
            FilterExpression,
            TableName
        };
        
        return params;
    }
    
    render() {
        const resultsStr = this.state.results.reduce((str, result) => {
            str += "* " + result + "\n";
            return str;
        }, "");
        
        return(
            <div>
                <QueryItemForm 
                    name="queryItem"
                    formControls={this.state.queryItem}
                />
                <AddItemForm 
                    name="addItem"
                    formControls={this.state.addItem}
                />
                <CreateTableForm
                    name="createTable"
                    formControls={this.state.createTable}
                />
                <h1>Result:</h1>
                <textarea value={resultsStr} readOnly />
            </div>
        );
    }
}

class CreateTableForm extends React.Component {
    render() {
        return(
            <form>
                <h1>Create how many tables?</h1>
                <input name={this.props.name+"-num"} type="text" onChange={this.props.formControls.onChange} />
                <input type="submit" value="Create" onClick={this.props.formControls.onSubmit} />
            </form>
        );
    }
}

class AddItemForm extends React.Component {
    render() {
        return(
            <form>
                <h1>Create how many items?</h1>
                <input name={this.props.name+"-num"} type="text" onChange={this.props.formControls.onChange} />
                <input type="submit" value="Create" onClick={this.props.formControls.onSubmit} />
            </form>
        );
    }
}

class QueryItemForm extends React.Component {
    render() {
        return(
            <form id="query">
                <h1>Query Items</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>Actor:</td>
                            <td><input name={this.props.name+"-actor"} value={this.props.formControls.actor} type="text" onChange={this.props.formControls.onChange} /></td>
                        </tr>
                        <tr>
                            <td>Year:</td>
                            <td><input name={this.props.name+"-year"} value={this.props.formControls.year} type="text" onChange={this.props.formControls.onChange} /></td>
                        </tr>
                        <tr>
                            <td>Title:</td>
                            <td><input name={this.props.name+"-title"} type="text" onChange={this.props.formControls.onChange} /></td>
                        </tr>
                        <tr>
                            <td>Popular:</td>
                            <td><input name={this.props.name+"-popular"} type="text" onChange={this.props.formControls.onChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Query" onClick={this.props.formControls.onSubmit} />
            </form>
        );
    }
}


export {
    TestElemView
};