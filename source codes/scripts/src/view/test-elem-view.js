import { TableModel } from "../model/table-model.js";
import { TableController } from "../controller/table-controller.js";

const beautify = require("json-beautify");
const React = require("react");

class TestElemView extends React.Component {
    constructor() {
        super();
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitCreateTableForm = this.handleSubmitCreateTableForm.bind(this);
        this.handleSubmitAddItemForm = this.handleSubmitAddItemForm.bind(this);
        
        this.deleteItem = this.deleteItem.bind(this);
        this.queryItems = this.queryItems.bind(this);
        this.queryAllItems = this.queryAllItems.bind(this);
        this.createTable = this.createTable.bind(this);
        this.deleteTable = this.deleteTable.bind(this);
        this.genNewTableName = this.genNewTableName.bind(this);
        this.genCreateTableParams = this.genCreateTableParams.bind(this);
        
        this.state = {
            createTable: {
                num: 1,
                onChange: this.handleChange,
                onSubmit: this.handleSubmitCreateTableForm
            },
            addItem: {
                num: 10,
                tableName: "TestTable1",
                onChange: this.handleChange,
                onSubmit: this.handleSubmitAddItemForm
            },
            queryItem: {
                actor: "John",
                year: "1910",
                title: "title",
                popular: "Y",
                tableName: "TestTable1",
                onChange: this.handleChange,
                onClickQuery: this.queryItems,
                onClickQueryAll: this.queryAllItems
            },
            deleteItem: {
                actor: "John",
                award: "award-1",
                year: "1901",
                title: "title-1",
                popular: "N",
                tableName: "TestTable1",
                onChange: this.handleChange,
                onClickDelete: this.deleteItem
            },
            result: {}
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
    }
    
    async handleSubmitCreateTableForm(e) {
        e.preventDefault();
        
        this.setState({result: {}});
        const num = this.state.createTable.num;
        let result = [];
        for(let i=1; i<=num; i++) {
            const tableName = this.genNewTableName(i);
            await this.deleteTable(tableName);
            const createTableResult = await this.createTable(tableName);
            result.push(createTableResult);
        }
        this.setState({result});
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
    
    async handleSubmitAddItemForm(e) {
        e.preventDefault();
        
        this.setState({result: {}});
        const params = this.genAddItemsParams();
        const result = await TableModel.addItems(params);
        this.setState({result});
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
                            title: {S: "title-" + i},
                            popular: {BOOL: (i%2 == 0)},
                            award: {S: "award-" + i}
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
    
    async queryItems(e) {
        e.preventDefault();
        
        this.setState({result: {}});
        const params = this.genQueryItemParams();
        const result = await TableModel.query(params);
        this.setState({result});
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
    
    async queryAllItems(e) {
        e.preventDefault();
        const items = await TableController.getAllItems(this.state.queryItem.tableName);
        this.setState({result: {...items}});
    }

    deleteItem(e) {
        e.preventDefault();
        const tableName = this.state.deleteItem.tableName;
        const attrDefs = [
            { name: "actor", type: "S", keyType: "HASH" },
            { name: "year", type: "N", keyType: "RANGE" },
            { name: "award", type: "S", keyType: "NON-KEY" },
            { name: "title", type: "S", keyType: "NON-KEY" },
            { name: "popular", type: "BOOL", keyType: "NON-KEY" }
        ];
        const attrCondition = {
            actor: this.state.deleteItem.actor,
            award: this.state.deleteItem.award,
            year: this.state.deleteItem.year,
            title: this.state.deleteItem.title,
            popular: this.state.deleteItem.popular
        };
        const result = TableController.deleteItem(tableName, attrDefs, attrCondition);
        this.setState({result});
    }
    
    render() {        
        return(
            <div>
                <DeleteItemForm 
                    name="deleteItem"
                    formControls={this.state.deleteItem}
                />
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
                <textarea value={beautify(this.state.result, null, 2, 100)} readOnly />
            </div>
        );
    }
}

class CreateTableForm extends React.Component {
    render() {
        return(
            <form>
                <h1>Create how many tables?</h1>
                <input name={this.props.name+"-num"} value={this.props.formControls.num} type="text" onChange={this.props.formControls.onChange} />
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
                <input name={this.props.name+"-num"} value={this.props.formControls.num} type="text" onChange={this.props.formControls.onChange} />
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
                            <td><input name={this.props.name+"-title"} value={this.props.formControls.title} type="text" onChange={this.props.formControls.onChange} /></td>
                        </tr>
                        <tr>
                            <td>Popular:</td>
                            <td><input name={this.props.name+"-popular"} value={this.props.formControls.popular} type="text" onChange={this.props.formControls.onChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Query" onClick={this.props.formControls.onClickQuery} />
                <input type="submit" value="Query All" onClick={this.props.formControls.onClickQueryAll} />
            </form>
        );
    }
}

class DeleteItemForm extends React.Component {
    render() {
        return(
            <form id="delete-item">
                <h1>Delete Items</h1>
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
                            <td>Award:</td>
                            <td><input name={this.props.name+"-award"} value={this.props.formControls.award} type="text" onChange={this.props.formControls.onChange} /></td>
                        </tr>
                        <tr>
                            <td>Title:</td>
                            <td><input name={this.props.name+"-title"} value={this.props.formControls.title} type="text" onChange={this.props.formControls.onChange} /></td>
                        </tr>
                        <tr>
                            <td>Popular:</td>
                            <td><input name={this.props.name+"-popular"} value={this.props.formControls.popular} type="text" onChange={this.props.formControls.onChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Delete" onClick={(e) => this.props.formControls.onClickDelete(e)} />
            </form>
        );
    }
}


export {
    TestElemView
};