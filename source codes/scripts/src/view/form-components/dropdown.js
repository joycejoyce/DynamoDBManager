const React = require("react");

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        
        this.toggle = this.toggle.bind(this);
        this.toggleListDisplay = this.toggleListDisplay.bind(this);
        this.toggleIElemClass = this.toggleIElemClass.bind(this);
        
        this.state = {
            btnText: this.props.value,
            listDisplay: "none",
            iElemClass: "fa-caret-down"
        };
    }
    
    static getOptionsByList(items) {
        const options = items.map(item => ({value: item, displayValue: item}));
        return options;
    }
    
    handleItemClick(e) {
        //1
        const btnText = e.target.value;
        this.setState({btnText});
        
        //2
        this.toggle();
        
        //3
        this.props.onChange(e);
    }
    
    handleBtnClick() {
        this.toggle();
    }
    
    toggle() {
        this.toggleListDisplay();
        this.toggleIElemClass();
    }
    
    toggleListDisplay() {
        const display = ["none", "block"];
        const listDisplay = (this.state.listDisplay === display[0]) ? display[1] : display[0];
        this.setState({listDisplay});
    }
    
    toggleIElemClass() {
        const classes = ["fa-caret-down", "fa-caret-up"];
        const iElemClass = (this.state.iElemClass === classes[0]) ? classes[1] : classes[0];
        this.setState({iElemClass});
    }
    
    render() {
        const styles = {
            listDisplay: {
                display: this.state.listDisplay
            }
        };
        return (
            <div className="dropdown">
                <div className="dropdown-btn-container">
                    <input className="dropdown-btn"
                        type="text"
                        onClick={this.handleBtnClick}
                        value={this.state.btnText}
                        readOnly
                    />
                    <i className={"fas "+this.state.iElemClass}></i>
                </div>
                <div className="dropdown-list" style={styles.listDisplay}>
                    {
                        this.props.options.map(opt => (
                            <input type="text"
                                key={opt.value}
                                name={this.props.name}
                                value={opt.value}
                                onClick={this.handleItemClick}
                                spellcheck="false"
                                readOnly
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export {
    Dropdown
};