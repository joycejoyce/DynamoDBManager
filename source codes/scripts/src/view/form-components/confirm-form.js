const React = require("react");

class ConfirmForm extends React.Component {
    static getCancelBtn(text, onClickFunc) {
        return this.getBtn(BTN_TYPE.cancel, text, onClickFunc);
    }
    
    static getOkBtn(text, onClickFunc) {
        return this.getBtn(BTN_TYPE.ok, text, onClickFunc);
    }

    static getBtn(type, text, onClickFunc) {
        const btn = {
            className: type,
            text: text,
            onClick: onClickFunc
        };

        return btn;
    }
    
    render() {
        const display = {
            display: this.props.display
        };
        
        const buttons = this.props.buttons.map(button => (
                <button key={button.className}
                    className={button.className}
                    onClick={button.onClick}>
                    {button.text}
                </button>
            )
        );
        
        return (
            <div className={CLASS_NAME.container}
                style={display}
                id={this.props.id}
                onClick={this.handleClickContainer}
            >
                <div className={CLASS_NAME.page + " " + CLASS_NAME.animate}>
                    <div className={CLASS_NAME.contents}>
                        {this.props.contents}
                        {buttons}
                    </div>
                </div>
            </div>
        );
    }
}

const CLASS_NAME = {
    container: "confirm-container",
    page: "confirm-page",
    animate: "confirm-page-animate",
    contents: "confirm-contents"
};
            
const BTN_TYPE = {
    cancel: "cancel",
    ok: "ok"
}

export { ConfirmForm }