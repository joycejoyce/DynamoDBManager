const React = require("react");

class Select extends React.Component {
    static getOptionsByList(items) {
        const options = items.map(item => ({value: item, displayValue: item}));
        return options;
    }
    
    render() {
        return (
            <select name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
                <option value="default" disabled>{this.props.placeholder}</option>
                {
                    this.props.options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.displayValue}
                        </option>
                    ))
                }
            </select>
        );
    }
}

export {
    Select
};