import { Util } from "./util.js";

const React = require("react");

class Dropdown extends React.Component {
    constructor() {
        super();
        
        this.state = {
            btnText: ""
        };
        
        this.getIElem = this.getIElem.bind(this);
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
        if(this.props.onClickBtn !== undefined) {
            await this.props.onClickBtn();
        }
        
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
        
        const text = e.target.textContent;
        this.setState(state => ({ btnText: text }));
        
        if(this.props.onClickListItem !== undefined) {
            await this.props.onClickListItem(text);
        }
    }
    
    render() {
        return(
            <div className="dropdown" id={this.props.id}>
                <DropdownBtnContainer onClickBtn={this.handleClickBtn} btnText={this.state.btnText} />
                <DropdownList className="dropdown-list" contents={this.props.contents} onClickListItem={this.handleClickListItem}/>
            </div>
        );
    }
}

class DropdownBtnContainer extends React.Component {
    render() {
        return(
            <div className="dropdown-btn-container">
                <input className="dropdown-btn" type="text" onClick={this.props.onClickBtn} value={this.props.btnText} readOnly />
                <i className="fas fa-caret-down"></i>
            </div>
        );
    }
}

class DropdownList extends React.Component {
    render() {
        const contents = this.props.contents;
        let contentElems = [];
        if(contents.length > 0) {
            contentElems = contents.map(content => (<a key={content} onClick={this.props.onClickListItem}>{content}</a>));
        }
        else {
            contentElems = [(<a onClick={this.props.onClickListItem}>(No items)</a>)];
        }
        return(
            <div className="dropdown-list">
                {contentElems}
            </div>
        );
    }
}

export { Dropdown };