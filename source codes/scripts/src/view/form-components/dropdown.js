const React = require("react");

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        
        this.testHandleBtnChange = this.testHandleBtnChange.bind(this);
        
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
        const btnText = e.target.textContent;
        this.toggle();
        this.setState({btnText});
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
    
    testHandleBtnChange(e) {
        console.log("e.value", e.target.value);
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
                            onChange={this.testHandleBtnChange.bind(this)}
                            onClick={this.handleBtnClick}
                            value={this.state.btnText}
                            readOnly
                    />
                    <i className={"fas "+this.state.iElemClass}></i>
                </div>
                <div className="dropdown-list" style={styles.listDisplay}>
                    {
                        this.props.options.map(opt => (
                            <a type="text" key={opt.value} onClick={this.handleItemClick}>{opt.displayValue}</a>
                        ))
                    }
                </div>

            {/*<select calssName="dropdown" name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
                <option value="default" disabled>{this.props.placeholder}</option>
                {
                    this.props.options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.displayValue}
                        </option>
                    ))
                }
            </select>*/}
            </div>
            
        );
    }
}

export {
    Dropdown
};