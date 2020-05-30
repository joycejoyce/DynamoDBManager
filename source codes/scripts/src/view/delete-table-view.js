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
    render() {
        return (
			<form id="delete-table-form">
                <TableList />
                <button>Deselect All</button>
                <button>Select All</button>
                <button type="submit">Delete</button>
            </form>
		);
	}
}

class TableList extends React.Component {
    constructor() {
        super();
        this.state = { tables: [] , rows: [] };
        this.setTables();
        
        this.setTables = this.setTables.bind(this);
        this.setRows = this.setRows.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.toggleAllCheckboxes = this.toggleAllCheckboxes.bind(this);
    }
    
    async setTables() {
        const tables = await TableModel.list;
        await this.setState(state => ({ tables: tables }));
        this.setRows(false);
    }
    
    setRows(isChecked) {
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
    
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" onChange={this.toggleAllCheckboxes}/></th>
                        <th>Table Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.rows.map(row => (<TableListRow key={row.table} onChangeFunc={this.toggleCheckbox} {...row} />))
                    }
                    <tr>
                        <td colSpan="2">Total: <span id="table-num">{this.state.tables.length}</span> tables</td>
                    </tr>
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
