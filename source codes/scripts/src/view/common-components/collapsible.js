const React = require("react");

class Collapsible extends React.Component {
    render() {
        return(
            <div id={this.props.id} className="collapsible">
                <CollapsibleBtn text={this.props.btnText}/>
                <CollapsibleContents contents={this.props.contents}/>
            </div>
        );
    }
}

class CollapsibleBtn extends React.Component {
    render() {
        return(
            <button className="collapsible-btn">
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