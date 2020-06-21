import { TableController } from "../controller/table-controller.js";
import { Dropdown } from "./form-components/dropdown.js";

const React = require("react");

class ManageTableItemsView extends React.Component {
    constructor() {
        super();
        
        this.handleClickChooseTableName = this.handleClickChooseTableName.bind(this);
        this.handleTableNameChange = this.handleTableNameChange.bind(this);
        this.handleClickAddItem = this.handleClickAddItem.bind(this);
        this.handleClickDeleteAddedItem = this.handleClickDeleteAddedItem.bind(this);
        this.handleChangeAttrValue = this.handleChangeAttrValue.bind(this);
        this.handleClickUpdateItemOption = this.handleClickUpdateItemOption.bind(this);
        
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
                origItems: [],
                items: [],
                eventHandler: {
                    onClickAddItem: this.handleClickAddItem,
                    onClickAddAttr: this.handleClickAddAttr,
                    onClickDeleteAddedItem: this.handleClickDeleteAddedItem,
                    onChangeAttrValue: this.handleChangeAttrValue,
                    onClickUpdateItemOption: this.handleClickUpdateItemOption
                }
            },
            attrs: {
                keyAttrs: [],
                nonKeyAttrs: [],
                nameKeyMap: {},
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
        this.changeState("update", "origItems", JSON.parse(JSON.stringify(items)));
        
        const keyAttrs = await TableController.getKeyAttrs(tableName);
        this.changeState("attrs", "keyAttrs", keyAttrs);
        
        const nonKeyAttrs = await TableController.getNonKeyAttrs(tableName);
        this.changeState("attrs", "nonKeyAttrs", nonKeyAttrs);
        
        const nameKeyMap = await TableController.getAttrNameKeyMap(tableName);
        this.changeState("attrs", "nameKeyMap", nameKeyMap);
        
        const attrNameTypeMap = await TableController.getAllAttrNameTypeMap(tableName);
        this.changeState("attrs", "nameTypeMap", attrNameTypeMap);
    }
    
    handleClickAddItem() {
        const newItem = this.getEmptyNewItem();
        this.changeState("update", "items", [...this.state.update.items, newItem]);
    }
    
    getEmptyNewItem() {
        let attrs = this.state.attrs.keyAttrs.reduce((accumulator, attr) => {
            accumulator[attr] = "";
            return accumulator;
        }, {});
        
        attrs = this.state.attrs.nonKeyAttrs.reduce((attrs, attr) => {
            attrs[attr] = "";
            return attrs;
        }, attrs);
        
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
    
    async handleChangeAttrValue(e, id) {
        const name = e.target.name;
        const value = e.target.value;
        
        const newItems = [...this.state.update.items].reduce((result, item) => {
            if(item.id === id) {
                item.attrs[name] = value;
            }
            result.push(item);
            return result;
        }, []);
        
        await this.changeState("update", "items", newItems);
    }
    
    async handleClickUpdateItemOption(id, action) {
        const newItems = [...this.state.update.items].reduce((accumulator, item) => {
            if(item.id === id) {
                item.updateMethod = action;
                switch(action) {
                    case UPDATE_METHOD.undo:
                        const origAttrs = this.state.update.origItems.filter(item => item.id === id)[0].attrs;
                        item.attrs = Object.assign({}, origAttrs);
                        break;
                } 
            }
            accumulator.push(item);
            return accumulator;
        }, []);
        
        await this.changeState("update", "items", newItems);
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
                    onChange={this.props.ctrl.onChange}
                />
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
            <section id="update" style={display}>
                <h1>Update Items</h1>
                <button onClick={this.props.ctrl.eventHandler.onClickAddItem}>Add Item</button>
                <button onClick={this.props.ctrl.eventHandler.onClickAddAttr}>Add Attribute</button>
                <UpdateStatus items={this.props.ctrl.items} />
                <UpdateItems ctrl={this.props.ctrl} attrs={this.props.attrs} />
            </section>
        );
    }
}

class UpdateStatus extends React.Component {
    render() {
        const addedNum = this.props.items.filter(item => item.updateMethod === UPDATE_METHOD.add).length;
        const modifiedNum = this.props.items.filter(item => item.updateMethod === UPDATE_METHOD.modify).length;
        const deletedNum = this.props.items.filter(item => item.updateMethod === UPDATE_METHOD.delete).length;
        const origNum = this.props.items.length - addedNum;
        
        return (
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
        );
    }
}

class UpdateItems extends React.Component {
    render() {
        const display = {
            display: (this.props.ctrl.items.length > 0) ? "block" : "none"
        }
        
        return (
            <table id="update-items" style={display}>
                <UpdateItemHeadRows item={this.props.ctrl.items}
                    attrs={this.props.attrs}
                />
                <tbody>
                    {
                        this.props.ctrl.items.map(item => (
                            <UpdateItemRow key={item.id}
                                item={item}
                                attrs={this.props.attrs}
                                eventHandler={this.props.ctrl.eventHandler}
                            />
                        ))
                    }
                </tbody>
            </table>
        );
    }
}

class UpdateItemHeadRows extends React.Component {
    render() {
        return (
            <thead>
                <tr>
                    <th>Name</th>
                    {
                        this.props.attrs.keyAttrs.map(attr => (<td key={attr}>{attr}</td>))
                    }
                    {
                        this.props.attrs.nonKeyAttrs.map(attr => (<td key={attr}>{attr}</td>))
                    }
                </tr>
                <tr>
                    <th>Type</th>
                    {
                        this.props.attrs.keyAttrs.map(attr => (<td key={attr}>{this.props.attrs.nameTypeMap[attr]}</td>))
                    }
                    {
                        this.props.attrs.nonKeyAttrs.map(attr => (<td key={attr}>{this.props.attrs.nameTypeMap[attr]}</td>))
                    }
                </tr>
                <tr>
                    <th>Key Type</th>
                    {
                        this.props.attrs.keyAttrs.map(attr => (<td key={attr}>{this.props.attrs.nameKeyMap[attr]}</td>))
                    }
                    {
                        this.props.attrs.nonKeyAttrs.map(attr => (<td key={attr}>NON-KEY</td>))
                    }
                </tr>
            </thead>
        );
    }
}

class UpdateItemRow extends React.Component {
    getUpdateBkColor() {
        let bkColor = {
            backgroundColor: UPDATE_BK_COLOR[this.props.item.updateMethod]
        };
        return bkColor;
    }
    
    getUpdateInput() {
        let updateInput;
        if(this.props.item.updateMethod === UPDATE_METHOD.add) {
            updateInput = (
                <i className="far fa-trash-alt"
                    onClick={() => this.props.eventHandler.onClickDeleteAddedItem(this.props.item.id)}>
                </i>
            );
        }
        else {
            updateInput = (
                <div>
                    <i className="far fa-trash-alt"
                        onClick={() => this.props.eventHandler.onClickUpdateItemOption(this.props.item.id, UPDATE_METHOD.delete)}>
                    </i>
                    &nbsp;&nbsp;
                    <i className="fas fa-pen"
                        onClick={() => this.props.eventHandler.onClickUpdateItemOption(this.props.item.id, UPDATE_METHOD.modify)}>
                    </i>
                    &nbsp;&nbsp;
                    <i className="fas fa-undo-alt"
                        onClick={() => this.props.eventHandler.onClickUpdateItemOption(this.props.item.id, UPDATE_METHOD.undo)}>
                    </i>
                </div>
            );
        }
        
        return updateInput;
    }
    
    getReadOnly() {
        if(this.props.item.updateMethod === UPDATE_METHOD.modify || this.props.item.updateMethod === UPDATE_METHOD.add) {
            return false;
        }
        return true;
    }
    
    render() { 
        let updateInput = this.getUpdateInput();
        let inputIsReadOnly = this.getReadOnly();
        let bkColor = this.getUpdateBkColor();
        
        return(
            <tr style={bkColor}>
                <th>{updateInput}</th>
                {
                    this.props.attrs.keyAttrs.map(attr => (
                        <td key={attr}>
                            <input type="text"
                                name={attr}
                                value={this.props.item.attrs[attr]}
                                onChange={(e) => this.props.eventHandler.onChangeAttrValue(e, this.props.item.id)}
                                readOnly={inputIsReadOnly}
                            />
                        </td>
                    ))
                }
                {
                    this.props.attrs.nonKeyAttrs.map(attr => (
                        <td key={attr}>
                            <input type="text"
                                name={attr}
                                value={this.props.item.attrs[attr]}
                                onChange={(e) => this.props.eventHandler.onChangeAttrValue(e, this.props.item.id)}
                                readOnly={inputIsReadOnly}
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
    undo: "reverse changes"
}

const UPDATE_BK_COLOR = {
    add: "#2A9D8F",
    delete: "#E76F51",
    modify: "#0496ff",
    undo: ""
}

const ICON_CLASS = {
    delete: "far fa-trash-alt",
    modify: "fas fa-pen",
    undo: "fas fa-undo-alt"
}

export {
    ManageTableItemsView
}