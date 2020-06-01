import {IconElem} from "./icon-elem.js";

const React = require("react");

class Collapsible extends React.Component {
    constructor() {
        super();
        this.handleClickBtn = this.handleClickBtn.bind(this);
        this.toggleContentsMaxHeight = this.toggleContentsMaxHeight.bind(this);
        this.toggleIconByContentsMaxHeight = this.toggleIconByContentsMaxHeight.bind(this);
    }
    
    handleClickBtn(e) {
        const btn = e.target;
        const contents = e.target.parentElement.querySelector(".collapsible-contents");
        this.toggleContentsMaxHeight(contents);
        this.toggleIconByContentsMaxHeight(btn.querySelector("i"), contents.style.maxHeight);
    }
    
    toggleContentsMaxHeight(contents) {
        if(contents.style.maxHeight) {
            contents.style.maxHeight = null;
            contents.style.overflow = "hidden";
        }
        else {
            //contents.style.maxHeight = contents.scrollHeight + "px";
            contents.style.maxHeight = "60vh";
            contents.style.overflow = "auto";
        }
    }
    
    toggleIconByContentsMaxHeight(icon, maxHeight) {
        icon.className = IconElem.elem.BASIC;
        if(maxHeight) {
            icon.classList.add(IconElem.elem.UP);
        }
        else {
            icon.classList.add(IconElem.elem.DOWN);
        }

        return icon.className;
    }
    
    render() {
        return(
            <div id={this.props.id} className="collapsible">
                <CollapsibleBtn text={this.props.btnText} onClickFunc={this.handleClickBtn} />
                <CollapsibleContents contents={this.props.contents}/>
            </div>
        );
    }
}

class CollapsibleBtn extends React.Component {
    render() {
        return(
            <button className="collapsible-btn" onClick={this.props.onClickFunc}>
                {this.props.text}
                <i className="fas fa-caret-down"></i>
            </button>
        );
    }
}

class CollapsibleContents extends React.Component {
    render() {
        return(
            <div className="collapsible-contents">{this.props.contents}</div>
        );
    }
}

export {
    Collapsible
}