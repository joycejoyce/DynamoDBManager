import { TableController } from "../controller/table-controller.js";
import { Dropdown } from "./form-components/dropdown.js";

const React = require("react");

class ManageTableItemsView extends React.Component {
    constructor() {
        super();
        
        this.handleClickChooseTableName = this.handleClickChooseTableName.bind(this);
        this.handleTableNameChange = this.handleTableNameChange.bind(this);
        this.handleClickAddItem = this.handleClickAddItem.bind(this);
        this.handleClickAddAttr = this.handleClickAddAttr.bind(this);
        this.handleClickDeleteAddedItem = this.handleClickDeleteAddedItem.bind(this);
        this.handleChangeAttrValue = this.handleChangeAttrValue.bind(this);
        
        this.setTableData = this.setTableData.bind(this);
        
        this.state = {
            tableName: {
                value: "",
                list: [],
                onClick: this.handleClickChooseTableName,
                onChange: this.handleTableNameChange
            },
            update: {
                display: "none",
                items: [],
                onClickAddItem: this.handleClickAddItem,
                onClickAddAttr: this.handleClickAddAttr,
                onClickDeleteAddedItem: this.handleClickDeleteAddedItem,
                onChangeAttrValue: this.handleChangeAttrValue
            },
            attrs: {
                orig: [],
                added: [],
                nameTypeMap: {}
            }
        }
    }
    
    async handleClickChooseTableName() {
        const list = await TableController.getAllTableNames();
        this.changeState("tableName", "list", list);
    }
    
    changeState(...args) {
        const newState = {...this.state[args[0]]};
        
        const level = args.length - 1;
        switch(level) {
            case 1:
                this.setState({[args[0]]: args[1]});
                break;
            case 2:
                newState[args[1]] = args[2];
                this.setState({[args[0]]: newState});
                break;
            default:
                throw(`Unexpected level number: ${level}`);
                break;
        }
    }
    
    handleTableNameChange(e) {
        const tableName = e.target.value;
        this.changeState("tableName", "value", tableName);
        
        this.setTableData(tableName);
        
        this.changeState("update", "display", "block");
    }
    
    async setTableData(tableName) {
        const items = await TableController.getAllItems(tableName);
        this.changeState("update", "items", items);
        
        const attrs = await TableController.getAllAttrs(tableName);
        this.changeState("attrs", "orig", attrs);
        
        const attrNameTypeMap = await TableController.getAllAttrNameTypeMap(tableName);
        this.changeState("attrs", "nameTypeMap", attrNameTypeMap);
    }
    
    handleClickAddItem() {
        const newItem = this.getEmptyNewItem();
        this.changeState("update", "items", [...this.state.update.items, newItem]);
    }
    
    getEmptyNewItem() {
        const attrs = this.state.attrs.orig.reduce((accumulator, attr) => {
            accumulator[attr] = "";
            return accumulator;
        }, {});
        const item = {
            id: this.state.update.items.length,
            updateMethod: UPDATE_METHOD.add,
            attrs
        };
        return item;
    }
    
    handleClickDeleteAddedItem(id) {
        const newItems = this.state.update.items.filter(item => item.id !== id);
        this.changeState("update", "items", newItems);
    }
    
    handleChangeAttrValue(e, id) {
        const name = e.target.name;
        const value = e.target.value;
        
        const curItems = [...this.state.update.items];
        const newItems= curItems.reduce((result, item) => {
            if(item.id === id) {
                item.attrs[name] = value;
            }
            result.push(item);
            return result;
        }, []);
        
        this.changeState("update", "items", newItems);
    }
    
    handleClickAddAttr() {
        
    }
    
    render() {
        return(
            <div>
                <TableNameSection ctrl={this.state.tableName} />
                <UpdateSection ctrl={this.state.update} attrs={this.state.attrs} />
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
                    onClick={this.props.ctrl.onClick}
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
        const itemsDisplay = {
            display: (this.props.ctrl.items.length > 0) ? "block" : "none"
        }
        
        const addedNum = this.props.ctrl.items.filter(item => item.updateMethod === UPDATE_METHOD.add).length;
        const modifiedNum = this.props.ctrl.items.filter(item => item.updateMethod === UPDATE_METHOD.modify).length;
        const deletedNum = this.props.ctrl.items.filter(item => item.updateMethod === UPDATE_METHOD.delete).length;
        const origNum = this.props.ctrl.items.length - addedNum;
        
        return(
            <section id="update-table-items" style={display}>
                <h1>Update Items</h1>
                <button onClick={this.props.ctrl.onClickAddItem}>Add Item</button>
                <button onClick={this.props.ctrl.onClickAddAttr}>Add Attribute</button>
                <table id="update-status">
                    <tbody>
                        <tr>
                            <td>Total in DB:</td>
                            <td><span className="stress">{origNum}</span> items</td>
                        </tr>
                        <tr>
                            <td>Added:</td>
                            <td><span className="stress">{addedNum}</span> items</td>
                        </tr>
                        <tr>
                            <td>Modified:</td>
                            <td><span className="stress">{modifiedNum}</span> items</td>
                        </tr>
                        <tr>
                            <td>Deleted:</td>
                            <td><span className="stress">{deletedNum}</span> items</td>
                        </tr>
                    </tbody>
                </table>
                <table id="update-items" style={itemsDisplay}>
                    <thead>
                        <tr>
                            <td>Reset</td>
                            <td>Update</td>
                            {
                                this.props.attrs.orig.map(attr => (
                                    <td key={attr}>
                                        <div>{attr}</div>
                                        <div className="attr-type">{this.props.attrs.nameTypeMap[attr]}</div>
                                    </td>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.ctrl.items.map(item => (
                                <UpdateItemRow key={item.id}
                                    item={item}
                                    attrs={this.props.attrs}
                                    onChange={this.props.ctrl.onChangeAttrValue}
                                    onClickDeleteAddedItem={this.props.ctrl.onClickDeleteAddedItem}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </section>
        );
    }
}

class UpdateItemRow extends React.Component {
    render() {
        let resetInput;
        if(this.props.item.updateMethod === UPDATE_METHOD.add) {
            resetInput = (
                <img className="delete-btn"
                    src="./resources/manage-table-items-page/delete.png"
                    onClick={() => this.props.onClickDeleteAddedItem(this.props.item.id)}
                />
            );
        }
        
        let updateInput;
        if(this.props.item.updateMethod === UPDATE_METHOD.add) {
            updateInput = (<p>add</p>);
        }
                           
        return(
            <tr>
                <td>{resetInput}</td>
                <td>{updateInput}</td>
                {
                    Object.keys(this.props.item.attrs).map(attr => (
                        <td key={attr}>
                            <input type="text"
                                name={attr}
                                value={this.props.item.attrs[attr]}
                                onChange={(e) => this.props.onChange(e, this.props.item.id)}
                            />
                        </td>
                    ))
                }
            </tr>
        );
    }
}

const UPDATE_METHOD = {
    add: "add",
    delete: "delete",
    modify: "modify",
    none: ""
}

export {
    ManageTableItemsView
}