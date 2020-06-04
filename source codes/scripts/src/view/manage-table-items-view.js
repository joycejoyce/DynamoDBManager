import { TableModel } from "../model/table-model.js";
import { Dropdown } from "./common-components/dropdown.js";

const React = require("react");

class ManageTableItemsView extends React.Component {
    constructor() {
        super();
        this.state = {
            tableList: [],
            tableName: "",
            queryConditions: []
        };
        this.setTableList();
        
        this.setTableList = this.setTableList.bind(this);
        this.handleTableListClick = this.handleTableListClick.bind(this);
        this.handleTableListChange = this.handleTableListChange.bind(this);
        this.handleTableNameClick = this.handleTableNameClick.bind(this);
    }
    
    handleTableListClick() {
        this.setTableList();
    }
    
    handleTableListChange() {
        
    }
    
    handleTableNameClick() {
        
    }
    
    async setTableList() {
        const tableList = await TableModel.list();
        this.setState(state => ({ tableList: tableList }));
    }
    
    setTableName(e) {
        const tableName = e.target.innerHTML;
        this.setState(state => ({ tableName: tableName }));
    }
    
    render() {
        return (
            <div id="manage-table-items">
                <Query
                    onTableListClick={this.handleTableListClick}
                    onTableListChange={this.handleTableListChange}
                    onTableNameClick={this.handleTableNameClick}
                    tableList={this.state.tableList}
                />
                <Modify />
            </div>
        );
    }
}

class Query extends React.Component {
    render() {
        return (
            <form id="query-form">
                <label htmlFor="tableName">Choose a table: </label>
                <Dropdown id="table-list" contents={this.props.tableList} onClickBtn={this.setTableList} onClickListItem={this.setTableName} />
            </form>
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