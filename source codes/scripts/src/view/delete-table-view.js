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
        this.state = { tables: [] , rows: []};
        this.setTables();
        this.setRows = this.setRows.bind(this);
        this.setTables = this.setTables.bind(this);
        this.selectOrDeselectAll = this.selectOrDeselectAll.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }
    
    async setTables() {
        const tables = await TableModel.list;
        await this.setState(state => ({ tables: tables }));
        this.setRows(false);
    }
    
    setRows(checked) {
        const tables = this.state.tables;
        const rows = tables.map(table => <TableListRow key={table} tableName={table} checked={checked} onChangeFunc={this.toggleCheckbox}/>);
        this.setState(state => ({ rows: rows }));
    }
    
    toggleCheckbox(e) {
        console.log("checked", e.target.checked);
        const isChecked = e.target.checked;
        e.target.checked = !isChecked;
    }
    
    selectOrDeselectAll(e) {
        /*const isChecked = e.target.checked;
        if(isChecked) {
            this.setRows(isChecked);
        }
        else {
            this.setRows(!isChecked);
        }*/
    }
    
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" onChange={(e)=>this.selectOrDeselectAll(e)}/></th>
                        <th>Table Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.rows}
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
                <td><input type="checkbox" className="delete-table-name" checked={this.props.checked} onChange={this.props.onChangeFunc}/></td>
                <td>{this.props.tableName}</td>
            </tr>
        );
    }
}

export { DeleteTableView };
