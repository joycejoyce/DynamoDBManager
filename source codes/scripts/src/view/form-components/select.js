const React = require("react");

class Select extends React.Component {
    static getOptionsByList(items) {
        const options = items.map(item => ({value: item, displayValue: item}));
        return options;
    }
    
    render() {
        const exceptOptions = Object.entries(this.props.contents)
            .filter(([key, value]) => key !== "options")
            .map(entry => entry);
        console.log("exceptOptions", exceptOptions);
        return (
            <select {...exceptOptions}>
                {
                    this.props.contents.options.map(opt => (
                        <option value={opt.value}>
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