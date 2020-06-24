import { TableController } from "../controller/table-controller.js";
import { Dropdown } from "./form-components/dropdown.js";
import { CommonVar } from "../controller/common-var.js";

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
        this.handleClickAddAttr = this.handleClickAddAttr.bind(this);
        this.handleChangeAddedAttr = this.handleChangeAddedAttr.bind(this);
        this.handleClickDeleteAddedAttr = this.handleClickDeleteAddedAttr.bind(this);
        this.handleChangeCheckDeleteAttr = this.handleChangeCheckDeleteAttr.bind(this);
        this.handleClickUpdate = this.handleClickUpdate.bind(this);
        
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
                items: [], itemIdCnt: 0,
                attrs: [], attrIdCnt: 0,
                eventHandler: {
                    onClickAddItem: this.handleClickAddItem,
                    onClickAddAttr: this.handleClickAddAttr,
                    onClickDeleteAddedItem: this.handleClickDeleteAddedItem,
                    onChangeAttrValue: this.handleChangeAttrValue,
                    onClickUpdateItemOption: this.handleClickUpdateItemOption,
                    onChangeAddedAttr: this.handleChangeAddedAttr,
                    onClickDeleteAddedAttr: this.handleClickDeleteAddedAttr,
                    onChangeCheckDeleteAttr: this.handleChangeCheckDeleteAttr,
                    onClickUpdate: this.handleClickUpdate
                }
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
        this.changeState("update", "itemIdCnt", items.length-1);
        
        const attrs = await TableController.getAllAttrs(tableName);
        this.changeState("update", "attrs", attrs);
        this.changeState("update", "attrIdCnt", attrs.length-1);
    }
    
    handleClickAddItem() {
        const newId = this.getNewItemId();
        const newItem = this.getEmptyNewItem(newId);
        this.changeState("update", "itemIdCnt", newId);
        this.changeState("update", "items", [...this.state.update.items, newItem]);
    }
    
    getNewItemId() {
        return this.state.update.itemIdCnt + 1;
    }
    
    getEmptyNewItem(id) {
        const attrs = this.state.update.attrs.reduce((accumulator, attr) => {
            accumulator[attr.name] = "";
            return accumulator;
        }, {});
        
        const item = {
            id: id,
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
        
        const newItems = [...this.state.update.items].reduce((result, item) => {
            if(item.id === id) {
                item.attrs[name] = value;
            }
            result.push(item);
            return result;
        }, []);
        
        this.changeState("update", "items", newItems);
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
    
    handleClickAddAttr() {
        const newId = this.getNewAttrId();
        const newAttr = this.getEmptyNewAttr(newId);
        const newAttrs = [...this.state.update.attrs, newAttr];
        this.changeState("update", "attrIdCnt", newId);
        this.changeState("update", "attrs", newAttrs);
    }
    
    getNewAttrId() {
        return this.state.update.attrIdCnt + 1;
    }
    
    getEmptyNewAttr(id) {
        const attr = {
            id: id,
            name: "",
            type: "",
            keyType: KEY_TYPE.NON_KEY,
            isNewAttr: true
        }
        
        return attr;
    }
    
    handleChangeAddedAttr(e, id) {
        const name = e.target.name;
        const value = e.target.value;
        
        const newAttrs = [...this.state.update.attrs].reduce((accumulator, attr) => {
            if(attr.id === id) {
                attr[name] = value;
            }
            accumulator.push(attr);
            return accumulator;
        }, []);
        
        this.changeState("update", "attrs", newAttrs);
    }
    
    handleClickDeleteAddedAttr(id) {
        const newAttrs = [...this.state.update.attrs].filter(attr => attr.id !== id);
        this.changeState("update", "attrs", newAttrs);
    }
    
    handleChangeCheckDeleteAttr(e, id) {
        const name = e.target.name;
        const isChecked = e.target.checked;
        const newAttrs = [...this.state.update.attrs].reduce((acc, attr) => {
            if(attr.id === id) {
                attr.delete = isChecked;
            }
            acc.push(attr);
            return acc;
        }, []);
        this.changeState("update", "attrs", newAttrs);
    }
    
    async handleClickUpdate(e) {
        e.preventDefault();
        const results = await this.deleteItems();
        this.setTableData(this.state.tableName.value);
    }
    
    async deleteItems() {
        const tableName = this.state.tableName.value;
        const attrDefs = this.state.update.attrs;
        const deleteItems = this.state.update.items.filter(item => item.updateMethod === UPDATE_METHOD.delete);
        const results = await Promise.all(
            this.state.update.items
                .filter(item => item.updateMethod === UPDATE_METHOD.delete)
                .map(async item => {
                    const result = await TableController.deleteItem(tableName, attrDefs, item.attrs);
                    return result;
                })
        );
        
        return results;
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
                <button type="submit" onClick={(e) => this.props.ctrl.eventHandler.onClickUpdate(e)}>Update</button>
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
                <UpdateItemHeadRows attrs={this.props.ctrl.attrs}
                    eventHandler={this.props.ctrl.eventHandler}
                />
                <tbody>
                    {
                        this.props.ctrl.items.map(item => (
                            <UpdateItemRow key={item.id}
                                item={item}
                                attrs={this.props.ctrl.attrs}
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
    getInput(attr, name) {
        const className = (name === "keyType" && attr[name] != KEY_TYPE.NON_KEY) ? "is-key": "";
        const isReadOnly = (name === "keyType") ? true:false;
        let contents;
        
        if(name === "delete") {
            if(attr.isNewAttr) {
                contents = (
                    <i className="fas fa-times"
                        onClick={() => this.props.eventHandler.onClickDeleteAddedAttr(attr.id)}>
                    </i>
                );
            }
            else {
                contents = (
                    <label className="checkbox">
                        <input type="checkbox"
                            name={name}
                            checked={attr.toDelete}
                            onChange={(e) => this.props.eventHandler.onChangeCheckDeleteAttr(e, attr.id)}
                        />
                        <span className="checkmark"></span>
                    </label>
                );
            }
        }
        else {
            if(attr.isNewAttr) {
                contents = (
                    <input type="text"
                        name={name}
                        value={attr[name]}
                        onChange={(e) => this.props.eventHandler.onChangeAddedAttr(e, attr.id)}
                        readOnly={isReadOnly}
                    />
                );
            }
            else {
                contents = attr[name];
            }
        }
        
        return <td key={attr.id} className={className}>{contents}</td>
    }
    
    render() {
        const deleteRows = this.props.attrs.map(attr => this.getInput(attr, "delete"));
        const nameRows = this.props.attrs.map(attr => this.getInput(attr, "name"));
        const typeRows = this.props.attrs.map(attr => this.getInput(attr, "type"));
        const keyTypeRows = this.props.attrs.map(attr => this.getInput(attr, "keyType"));
        
        return (
            <thead>
                <tr>
                    <th className="delete">Delete</th>
                    { deleteRows }
                </tr>
                <tr>
                    <th>Name</th>
                    { nameRows }
                </tr>
                <tr>
                    <th>Type</th>
                    { typeRows }
                </tr>
                <tr>
                    <th>Key Type</th>
                    { keyTypeRows }
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
    
    getUpdateOptions() {
        let updateOptions;
        if(this.props.item.updateMethod === UPDATE_METHOD.add) {
            updateOptions = (
                <i className="far fa-trash-alt"
                    onClick={() => this.props.eventHandler.onClickDeleteAddedItem(this.props.item.id)}>
                </i>
            );
        }
        else {
            updateOptions = (
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
        
        return updateOptions;
    }
    
    getReadOnly() {
        if(this.props.item.updateMethod === UPDATE_METHOD.modify || this.props.item.updateMethod === UPDATE_METHOD.add) {
            return false;
        }
        return true;
    }

    getAttrDeleted(attr) {
        return attr.delete;
    }

    getAttrInputs() {
        const inputs = this.props.attrs.map(attr => {
            let input;
            const isAttrDeleted = this.getAttrDeleted(attr);
            const deleteClassName = isAttrDeleted ? "deleted-attr" : "";
            const isReadOnly = (this.getReadOnly() || isAttrDeleted) ? true : false;
            switch(attr.type) {
                case ATTR_TYPE.BOOL:
                    input =
                        <td key={attr.id} className={deleteClassName}>
                            <Dropdown id={attr.name + "-input-" + this.props.item.id}
                                list={BOOL_OPTIONS}
                                name={attr.name}
                                value={this.props.item.attrs[attr.name]}
                                onChange={(e) => this.props.eventHandler.onChangeAttrValue(e, this.props.item.id)}
                                onChangeParams={[this.props.item.id]}
                                readOnly={isReadOnly}
                            />
                        </td>;
                    break;
                default:
                    input =
                        <td key={attr.id} className={deleteClassName}>
                            <input type="text"
                                name={attr.name}
                                value={this.props.item.attrs[attr.name]}
                                onChange={(e) => this.props.eventHandler.onChangeAttrValue(e, this.props.item.id)}
                                readOnly={isReadOnly}
                            />
                        </td>;
                    break;
            }
            return input;
        });
        
        return inputs;
    }
    
    render() {
        let updateOptions = this.getUpdateOptions();
        let bkColor = this.getUpdateBkColor();
        let attrInputs = this.getAttrInputs();
        
        return(
            <tr style={bkColor}>
                <th>{updateOptions}</th>
                {attrInputs}
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

const ATTR_TYPE = {
    BOOL: "BOOL"
}

const BOOL_OPTIONS = ["true", "false"];

const KEY_TYPE = CommonVar.KEY_TYPE;

export {
    ManageTableItemsView
}