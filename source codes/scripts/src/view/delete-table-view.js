import { Collapsible } from "./common-components/collapsible.js";
import { TableModel } from "../model/table-model.js";

const React = require("react");

class DeleteTableView extends React.Component {
	render() {
		return (
			<Collapsible 
                id="delete-table"
                btnText="Delete Tables"
                contents=<DeleteTableForm />
            />
		);
	}
}

class DeleteTableForm extends React.Component {
    constructor() {
        super();
        this.state = { tables: ["A"] };
    }
        
    async getTables() {
        const tables = await TableModel.list();
        //this.setState({ tables: tables });
        console.log("#", tables.length);
        return tables;
    }
    
    /*async setTables() {
        const tables = await TableModel.list();
        this.setState({ tables: tables });
        console.log("this.state.tables", this.state.tables);
    }*/
    
    setTables() {
        TableModel.list()
        .then(tables => {
            this.setState({ tables: tables });
            console.log("this.state.tables", this.state.tables);
        });
    }
    
    render() {
        
        /*TableModel.list()
        .then(tables => {
            this.setState({ tables: tables });
        });*/
        
        return (
			<form id="delete-table-form">
                <TableList />
                <div>Total: <span id="table-num">{this.state.tables.length}</span> tables</div>
                <button>Deselect All</button>
                <button>Select All</button>
                <button type="submit">Delete</button>
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
                        <th><i className="fas fa-sync"></i></th>
                        <th>Table Name</th>
                    </tr>
                </thead>
                <tbody>{/*rows*/}</tbody>
            </table>
        );
    }
}

class TableListRow extends React.Component {
    render() {
        return(
            <tr>
                <td></td>
            </tr>
        );
    }
}

export { DeleteTableView };
