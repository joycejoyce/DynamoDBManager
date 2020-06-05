import { TableModel } from "../model/table-model.js";

const React = require("react");

class TestElemView extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return(
            <div>
                <CreateTestTables />
            </div>
        );
    }
}

class CreateTestTables extends React.Component {
    constructor() {
        super();
        this.state = {
            tableNum: 0,
            results: []
        };
        
        this.handleTableNumChange = this.handleTableNumChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.createTable = this.createTable.bind(this);
        this.deleteTable = this.deleteTable.bind(this);
        this.getTableName = this.getTableName.bind(this);
        this.getCreateTableParams = this.getCreateTableParams.bind(this);
        this.resetResults = this.resetResults.bind(this);
    }
    
    handleTableNumChange(e) {
        const num = e.target.value;
        this.setState(state => ({ tableNum: num }));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        this.resetResults();
        const num = this.state.tableNum;
        for(let i=1; i<=num; i++) {
            const tableName = this.getTableName(i);
            await this.deleteTable(tableName);
            const result = await this.createTable(tableName);
            const newResults = this.state.results.concat(result);
            this.setState(state => ({ results: newResults }));
        }
    }
    
    getTableName(num) {
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
            const params = this.getCreateTableParams(tableName);
            const result = await TableModel.create(params);
            resolve(result);
        });
    }
    
    getCreateTableParams(tableName) {
        const params = {
            TableName: tableName,
            KeySchema: [{
                    AttributeName: "year",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "title",
                    KeyType: "RANGE"
                }
            ],
            AttributeDefinitions: [{
                    AttributeName: "year",
                    AttributeType: "N"
                },
                {
                    AttributeName: "title",
                    AttributeType: "S"
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };
        
        return params;
    }
    
    resetResults() {
        this.setState(state => ({ results: [] }));
    }

    render() {
        const resultsStr = this.state.results.reduce((str, result) => {
            str += "* " + result + "\n";
            return str;
        }, "");
        return(
            <form id="create-test-tables-form">
                <label htmlFor="table-num"><h1>Create how many tables?</h1></label>
                <input type="text" id="table-num" onChange={this.handleTableNumChange} />
                <input type="submit" id="create-btn" value="Create" onClick={this.handleSubmit} />
                <h1>Result:</h1>
                <textarea defaultValue={resultsStr} readOnly />
            </form>
        );
    }
}

export {
    TestElemView
};