import React, {Component} from 'react';


class RunScript extends Component {

    constructor(props) {
        super(props);
        this.state = {
            response: '',
            className: 'btn-main'
        };
    }

    onClick = async () => {
        this.setState({className: 'btn-main btn-disabled'});
        const response = await fetch('/run-py-script');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            response: body.express,
            className: 'btn-main'
        });
    };

    render() {
        return (
            <div className="app-upload">
                <p className={this.state.className} onClick={this.onClick}>Run Py Script</p>
                <p className="app-content">{this.state.response}</p>
            </div>
        )
    }
}

export default RunScript
