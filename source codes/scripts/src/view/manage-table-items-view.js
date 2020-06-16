import { TableController } from "../controller/table-controller.js";
import { TableItemController } from "../controller/table-item-controller.js";
import { Dropdown } from "./form-components/dropdown.js";

const React = require("react");

class ManageTableItemsView extends React.Component {
    constructor() {
        super();
        
        this.handleTableNameChange = this.handleTableNameChange.bind(this);
        this.handleClickAddItem = this.handleClickAddItem.bind(this);
        this.handleClickDeleteAddedItem = this.handleClickDeleteAddedItem.bind(this);
        
        this.state = {
            tableName: {
                value: "",
                list: [],
                onChange: this.handleTableNameChange
            },
            update: {
                display: "none",
                items: [],
                attrs: []
            },
            add: {
                display: "none",
                items: [],
                attrs: [],
                onClickAddItem: this.handleClickAddItem,
                onClickDelete: this.handleClickDeleteAddedItem,
                onChange: this.handleChangeAddedItem
            }
        }
    }
    
    componentDidMount() {
        this.setTableNameList();
    }
    
    async setTableNameList() {
        const list = await TableController.getAllTableNames();
        this.changeState("tableName", "list", list);
    }
    
    changeState(...args) {
        const newState = {...this.state[args[0]]};
        
        const level = args.length - 1;
        switch(level) {
            case 2:
                newState[args[1]] = args[2];
                break;
            default:
                throw(`Unexpected level number: ${level}`);
                break;
        }
        
        this.setState({[args[0]]: newState});
    }
    
    async handleTableNameChange(e) {
        const tableName = e.target.value;
        this.changeState("tableName", "value", tableName);
        
        const items = await TableItemController.queryAllItems(tableName);
        this.changeState("add", "items", items);
        this.changeState("update", "items", items);
        
        const attrs = await TableController.getAllAttrs(tableName);
        this.changeState("add", "attrs", attrs);
        this.changeState("update", "attrs", attrs);
        
        this.changeState("update", "display", "block");
        this.changeState("add", "display", "block");
    }
    
    handleClickAddItem() {
        const newItem = this.getEmptyAddItemCtrl();
        this.changeState("add", "items", [...this.state.add.items, newItem]);
    }
    
    getEmptyAddItemCtrl() {
        const attrs = this.state.add.attrs.reduce((result, attr) => {
            result[attr] = "";
            return result;
        }, {});
        
        return {
            id: this.state.add.items.length,
            attrs
        };
    }
    
    handleClickDeleteAddedItem(id) {
        const newItems = this.state.add.items.filter(item => item.id !== id);
        this.changeState("add", "items", newItems);
    }
    
    handleChangeAddedItem(item) {
        const changedItem = this.state.add.items.filter()
    }
    
    render() {
        return(
            <div>
                <TableNameSection ctrl={this.state.tableName} />
                <UpdateSection ctrl={this.state.update} />
                <AddSection ctrl={this.state.add} />
            </div>
        );
    }
}

class TableNameSection extends React.Component {
    render() {
        return(
            <section>
                <h1>Table Name</h1>
                <Dropdown id="tableName"
                    list={this.props.ctrl.list}
                    value={this.props.ctrl.value}
                    onChange={this.props.ctrl.onChange} />
            </section>
        );
    }
}

class UpdateSection extends React.Component {
    render() {
        const display = {
            display: this.props.ctrl.display
        };
        
        return(
            <section style={display}>
                <h1>Update Items</h1>
                <table>
                    <thead>
                        <tr>
                            <td>Reset</td>
                            <td>Update</td>
                            {
                                this.props.ctrl.attrs.map(attr => (<td key={attr}>{attr}</td>))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.ctrl.items.map(item => (
                                <UpdateItemRow key={item.id}
                                    item={item}
                                />
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="100%">Total: {this.props.ctrl.items.length} items</td>
                        </tr>
                    </tfoot>
                </table>
            </section>
        );
    }
}

class UpdateItemRow extends React.Component {
    render() {
        return(
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        );
    }
}

class AddSection extends React.Component {
    render() {
        const display = {
            display: this.props.ctrl.display
        };
        
        return(
            <section id="add-item" style={display}>
                <h1>Add Items</h1>
                <button onClick={this.props.ctrl.onClickAddItem}>Add Item</button>
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            {
                                this.props.ctrl.attrs.map(attr => (<td key={attr}>{attr}</td>))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.ctrl.items.map(item => (
                                <AddItemRow key={item.id}
                                    item={item}
                                    attrs={this.props.ctrl.attrs}
                                    onClickDelete={this.props.ctrl.onClickDelete}
                                    onChange={this.props.ctrl.onChange}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </section>
        );
    }
}

class AddItemRow extends React.Component {
    render() {
        return(
            <tr>
                <td>
                    <img className="delete-btn"
                        src="./resources/manage-table-items-page/delete.png"
                        onClick={() => this.props.onClickDelete(this.props.item.id)}
                    />
                </td>
                {
                    this.props.attrs.map(attr => (
                        <td key={attr}>
                            <input type="text"
                                name={attr}
                                value={this.props.item.attrs[attr]}
                                onChange={() => this.props.onChange(this.props.item.id)}
                            />
                        </td>
                    ))
                }
            </tr>
        );
    }
}

export {
    ManageTableItemsView
}