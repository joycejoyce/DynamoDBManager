import { Collapsible } from "./common-components/collapsible.js";
import { TableModel } from "../model/table-model.js";

const React = require("react");

class DeleteTableView extends React.Component {
    render() {
		return (
			<Collapsible
                btnText="Delete Tables"
                contents=<DeleteTableForm />
            />
		);
	}
}

class DeleteTableForm extends React.Component {
    constructor() {
        super();
        this.state = { tables: [] , rows: [] };
        this.resetTables();
        
        this.resetTables = this.resetTables.bind(this);
        this.resetRows = this.resetRows.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.toggleAllCheckboxes = this.toggleAllCheckboxes.bind(this);
        
        this.handleClickDeleteBtn = this.handleClickDeleteBtn.bind(this);
        this.deleteTables = this.deleteTables.bind(this);
        
        this.handleClickRefreshBtn = this.handleClickRefreshBtn.bind(this);
    }
    
    resetTables() {
        return new Promise(async (resolve) => {
            const tables = await TableModel.list();
            await this.setState(state => ({ tables: tables }));
            this.resetRows(false);
            resolve();
        });
    }
    
    resetRows(isChecked) {
        const tables = this.state.tables;
        const rows = tables.map(table => ({ table: table, isChecked: isChecked }));
        this.setState(state => ({ rows: rows }));
    }
    
    toggleCheckbox(e) {
        const rows = this.state.rows;
        const targetTable = e.target.value;
        rows.filter(row => row.table === targetTable)
            .forEach(row => row.isChecked = e.target.checked);
        this.setState({ rows: rows });
    }
    
    toggleAllCheckboxes(e) {
        const rows = this.state.rows;
        const targetTable = e.target.value;
        rows.forEach(row => row.isChecked = e.target.checked);
        this.setState({ rows: rows });
    }
    
    async handleClickDeleteBtn(e) {
        e.preventDefault();
        await this.deleteTables();
        await this.resetTables();
    }
    
    async deleteTables() {
        return new Promise(async resolve => {
            const tablesToDelete = this.state.rows.filter(row => row.isChecked).map(row => row.table);
            for(const table of tablesToDelete) {
                await TableModel.delete(table);
            }
            resolve();
        });
    }
    
    async handleClickRefreshBtn() {
        await this.resetTables();
        const collapsibleBtn = document.querySelector("#delete-table .collapsible-btn");
        collapsibleBtn.click(); collapsibleBtn.click();
    }
    
    render() {
        return (
			<form id="delete-table-form" onSubmit={this.handleClickDeleteBtn}>
                <button type="button" id="refresh" onClick={this.handleClickRefreshBtn}>Refresh</button>
                <TableList rows={this.state.rows} toggleCheckbox={this.toggleCheckbox} toggleAllCheckboxes={this.toggleAllCheckboxes} />
                <div>Total: <span id="table-num">{this.state.tables.length}</span> tables</div>
                <button type="submit" id="delete">Delete</button>
            </form>
		);
	}
}

class TableList extends React.Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" onChange={this.props.toggleAllCheckboxes}/></th>
                        <th>Table Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.rows.map(row => (<TableListRow key={row.table} onChangeFunc={this.props.toggleCheckbox} {...row} />))
                    }
                </tbody>
            </table>
        );
    }
}

class TableListRow extends React.Component {
    render() {
        return(
            <tr>
                <td><input type="checkbox" key={this.props.table} value={this.props.table} checked={this.props.isChecked} onChange={this.props.onChangeFunc}/></td>
                <td>{this.props.table}</td>
            </tr>
        );
    }
}

export { DeleteTableView };
