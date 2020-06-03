import { Util } from "./util.js";

const React = require("react");

class Dropdown extends React.Component {
    constructor() {
        super();
        
        //this.getIElem = this.getIElem.bind(this);
        this.getBtn = this.getBtn.bind(this);
        this.getList = this.getList.bind(this);
        
        this.handleClickBtn = this.handleClickBtn.bind(this);
        this.toggleFaCaretUpAndDownElem = this.toggleFaCaretUpAndDownElem.bind(this);
        this.handleClickListItem = this.handleClickListItem.bind(this);
    }

    getIElem() {
        return document.querySelector("#" + this.props.id + " .dropdown-btn-container>i");
    }

    getBtn() {
        return document.querySelector("#" + this.props.id + " .dropdown-btn");
    }
    
    getList() {
        return document.querySelector("#" + this.props.id + " .dropdown-list");
    }
    
    async handleClickBtn(e) {
        await this.props.updateList();
        
        this.toggleFaCaretUpAndDownElem(this.getIElem());
        
        Util.showOrHideElement(this.getList());
    }
    
    toggleFaCaretUpAndDownElem(iElem) {
        const classDown = "fa-caret-down";
        const classUp = "fa-caret-up";
        if(iElem.classList.contains(classDown)) {
            iElem.classList.remove(classDown);
            iElem.classList.add(classUp);
        }
        else if(iElem.classList.contains(classUp)) {
            iElem.classList.remove(classUp);
            iElem.classList.add(classDown);
        }
    }
    
    async handleClickListItem(e) {
        Util.showOrHideElement(this.getList());
        this.toggleFaCaretUpAndDownElem(this.getIElem());
        
        const newText = e.target.innerHTML;
        this.getBtn().value = newText;
        
        await this.props.clickItem(newText);
    }
    
    render() {
        return(
            <div className="dropdown" id={this.props.id}>
                <DropdownBtnContainer key="btn" onClick={this.handleClickBtn}/>
                <DropdownList key="list" className="dropdown-list" contents={this.props.contents} onClick={this.handleClickListItem}/>
            </div>
        );
    }
}

class DropdownBtnContainer extends React.Component {
    render() {
        return(
            <div className="dropdown-btn-container">
                <input className="dropdown-btn" type="text" onClick={this.props.onClick} readOnly />
                <i className="fas fa-caret-down"></i>
            </div>
        );
    }
}

class DropdownList extends React.Component {
    render() {
        const contentsLink = this.props.contents.map(content => <a key={content} onClick={this.props.onClick}>{content}</a>);
        return(
            <div className="dropdown-list">
                {contentsLink}
            </div>
        );
    }
}

export { Dropdown };