import { TableModel } from "../model/table-model.js";
import { Dropdown } from "./form-components/dropdown.js";
import { Select } from "./form-components/select.js";
import { validate } from "./form-components/validate.js";

const React = require("react");

class ManageTableItemsView extends React.Component {
    constructor() {
        super();
        //new
        this.setTableNameOptions = this.setTableNameOptions.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
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
                    onChange: this.changeHandler
                }
            }
        };
        //new
        this.setTableNameOptions();
    }
    
    changeHandler(event) {
        console.log("enter");
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

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    }
    
    async setTableNameOptions() {
        const tableNameList = await TableModel.list();
        const tableNameOptions = Dropdown.getOptionsByList(tableNameList);
        const formControls = {...this.state.formControls};
        formControls.tableName.options = tableNameOptions;
        this.setState({formControls});
    }
    
    render() {
        return (
            <div id="manage-table-items">
                <Query
                    tableName={this.state.formControls.tableName}
                />
                {/*<Modify />*/}
            </div>
        );
    }
}

class Query extends React.Component {
    render() {
        return (
            <form id="query-form">
                <label htmlFor="tableName"><h1>Table Name</h1></label>
                <Dropdown
                    name="tableName"
                    value={this.props.tableName.value}
                    onChange={this.props.tableName.onChange}
                    options={this.props.tableName.options}
                />
            </form>
        );
    }
}

export {
    ManageTableItemsView
};